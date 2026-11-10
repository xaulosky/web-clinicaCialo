<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CommissionResource\Pages;
use App\Models\Commission;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class CommissionResource extends Resource
{
    protected static ?string $model = Commission::class;
    protected static ?string $navigationIcon = 'heroicon-o-banknotes';
    protected static ?string $navigationLabel = 'Comisiones';
    protected static ?string $modelLabel = 'Comisión';
    protected static ?string $pluralModelLabel = 'Comisiones';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('affiliate_id')
                    ->label('Afiliado')
                    ->relationship('affiliate', 'nombre')
                    ->required()
                    ->searchable(),
                Forms\Components\Select::make('order_id')
                    ->label('Orden')
                    ->relationship('order', 'order_number')
                    ->required()
                    ->searchable(),
                Forms\Components\Select::make('coupon_id')
                    ->label('Cupón')
                    ->relationship('coupon', 'code')
                    ->required()
                    ->searchable(),
                Forms\Components\TextInput::make('monto_venta')
                    ->label('Monto Venta')
                    ->prefix('$')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('porcentaje_comision')
                    ->label('Porcentaje Comisión')
                    ->suffix('%')
                    ->required()
                    ->numeric(),
                Forms\Components\TextInput::make('monto_comision')
                    ->label('Monto Comisión')
                    ->prefix('$')
                    ->required()
                    ->numeric(),
                Forms\Components\Select::make('estado')
                    ->label('Estado')
                    ->options([
                        'pendiente' => 'Pendiente',
                        'aprobada' => 'Aprobada',
                        'pagada' => 'Pagada',
                        'cancelada' => 'Cancelada',
                    ])
                    ->required(),
                Forms\Components\DateTimePicker::make('fecha_pago')
                    ->label('Fecha de Pago')
                    ->nullable(),
                Forms\Components\Textarea::make('notas')
                    ->label('Notas')
                    ->rows(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('affiliate.nombre')
                    ->label('Afiliado')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('affiliate.codigo_afiliado')
                    ->label('Código')
                    ->searchable(),
                Tables\Columns\TextColumn::make('order.order_number')
                    ->label('Orden')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('monto_venta')
                    ->label('Venta')
                    ->money('CLP')
                    ->sortable(),
                Tables\Columns\TextColumn::make('monto_comision')
                    ->label('Comisión')
                    ->money('CLP')
                    ->sortable(),
                Tables\Columns\BadgeColumn::make('estado')
                    ->label('Estado')
                    ->colors([
                        'warning' => 'pendiente',
                        'primary' => 'aprobada',
                        'success' => 'pagada',
                        'danger' => 'cancelada',
                    ]),
                Tables\Columns\TextColumn::make('fecha_pago')
                    ->label('Pagado')
                    ->dateTime('d/m/Y')
                    ->sortable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Fecha')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('estado')
                    ->options([
                        'pendiente' => 'Pendiente',
                        'aprobada' => 'Aprobada',
                        'pagada' => 'Pagada',
                        'cancelada' => 'Cancelada',
                    ]),
                Tables\Filters\SelectFilter::make('affiliate_id')
                    ->label('Afiliado')
                    ->relationship('affiliate', 'nombre')
                    ->searchable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('approve')
                    ->label('Aprobar')
                    ->icon('heroicon-o-check')
                    ->color('success')
                    ->requiresConfirmation()
                    ->visible(fn($record) => $record->estado->value === 'pendiente')
                    ->action(function ($record) {
                        $record->estado = 'aprobada';
                        $record->save();
                    }),
                Tables\Actions\Action::make('pay')
                    ->label('Pagar')
                    ->icon('heroicon-o-banknotes')
                    ->color('primary')
                    ->requiresConfirmation()
                    ->visible(fn($record) => in_array($record->estado->value, ['pendiente', 'aprobada']))
                    ->action(function ($record) {
                        $record->estado = 'pagada';
                        $record->fecha_pago = now();
                        $record->save();

                        $affiliate = $record->affiliate;
                        if ($affiliate) {
                            $affiliate->comisiones_pagadas += $record->monto_comision;
                            $affiliate->save();
                        }
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('bulkPay')
                        ->label('Pagar seleccionadas')
                        ->icon('heroicon-o-banknotes')
                        ->color('success')
                        ->requiresConfirmation()
                        ->action(function ($records) {
                            foreach ($records as $record) {
                                if (!in_array($record->estado->value, ['pendiente', 'aprobada'])) {
                                    continue;
                                }
                                $record->estado = 'pagada';
                                $record->fecha_pago = now();
                                $record->save();

                                $affiliate = $record->affiliate;
                                if ($affiliate) {
                                    $affiliate->comisiones_pagadas += $record->monto_comision;
                                    $affiliate->save();
                                }
                            }
                        }),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListCommissions::route('/'),
            'create' => Pages\CreateCommission::route('/create'),
            'edit' => Pages\EditCommission::route('/{record}/edit'),
        ];
    }
}
