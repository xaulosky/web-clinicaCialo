<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CouponResource\Pages;
use App\Models\Coupon;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class CouponResource extends Resource
{
    protected static ?string $model = Coupon::class;
    protected static ?string $navigationIcon = 'heroicon-o-ticket';
    protected static ?string $navigationLabel = 'Cupones';
    protected static ?string $modelLabel = 'Cupón';
    protected static ?string $pluralModelLabel = 'Cupones';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Información del Cupón')
                    ->schema([
                        Forms\Components\TextInput::make('code')
                            ->label('Código')
                            ->required()
                            ->maxLength(50)
                            ->dehydrateStateUsing(fn($state) => strtoupper(trim($state))),
                        Forms\Components\Select::make('categoria')
                            ->label('Categoría')
                            ->options([
                                'descuento' => 'Descuento',
                                'personal' => 'Personal',
                                'afiliado' => 'Afiliado',
                            ])
                            ->default('descuento')
                            ->required(),
                        Forms\Components\Select::make('tipo')
                            ->label('Tipo')
                            ->options([
                                'porcentaje' => 'Porcentaje',
                                'monto' => 'Monto Fijo',
                            ])
                            ->default('porcentaje')
                            ->required(),
                        Forms\Components\TextInput::make('valor')
                            ->label('Valor')
                            ->required()
                            ->numeric()
                            ->prefix(fn($get) => $get('tipo') === 'monto' ? '$' : '%'),
                        Forms\Components\Textarea::make('descripcion')
                            ->label('Descripción')
                            ->rows(2),
                        Forms\Components\TextInput::make('monto_minimo')
                            ->label('Monto Mínimo')
                            ->prefix('$')
                            ->numeric()
                            ->nullable(),
                        Forms\Components\TextInput::make('descuento_maximo')
                            ->label('Descuento Máximo')
                            ->prefix('$')
                            ->numeric()
                            ->nullable(),
                        Forms\Components\TextInput::make('usos_maximos')
                            ->label('Usos Máximos')
                            ->numeric()
                            ->integer()
                            ->nullable(),
                        Forms\Components\DateTimePicker::make('fecha_inicio')
                            ->label('Fecha Inicio')
                            ->nullable(),
                        Forms\Components\DateTimePicker::make('fecha_fin')
                            ->label('Fecha Fin')
                            ->nullable(),
                        Forms\Components\Select::make('afiliado_id')
                            ->label('Afiliado')
                            ->relationship('affiliate', 'nombre')
                            ->searchable()
                            ->nullable(),
                        Forms\Components\TextInput::make('comision_porcentaje')
                            ->label('Comisión (%)')
                            ->numeric()
                            ->nullable(),
                        Forms\Components\Toggle::make('activo')
                            ->label('Activo')
                            ->default(true),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('code')
                    ->label('Código')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\BadgeColumn::make('categoria')
                    ->label('Categoría')
                    ->colors([
                        'primary' => 'descuento',
                        'warning' => 'personal',
                        'success' => 'afiliado',
                    ]),
                Tables\Columns\BadgeColumn::make('tipo')
                    ->label('Tipo'),
                Tables\Columns\TextColumn::make('valor')
                    ->label('Valor')
                    ->sortable(),
                Tables\Columns\TextColumn::make('usos_actuales')
                    ->label('Usos')
                    ->suffix(fn($record) => $record->usos_maximos ? ' / ' . $record->usos_maximos : ''),
                Tables\Columns\IconColumn::make('activo')
                    ->label('Activo')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Creado')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('categoria')
                    ->options([
                        'descuento' => 'Descuento',
                        'personal' => 'Personal',
                        'afiliado' => 'Afiliado',
                    ]),
                Tables\Filters\SelectFilter::make('tipo')
                    ->options([
                        'porcentaje' => 'Porcentaje',
                        'monto' => 'Monto Fijo',
                    ]),
                Tables\Filters\TernaryFilter::make('activo')
                    ->label('Activo'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
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
            'index' => Pages\ListCoupons::route('/'),
            'create' => Pages\CreateCoupon::route('/create'),
            'edit' => Pages\EditCoupon::route('/{record}/edit'),
        ];
    }
}
