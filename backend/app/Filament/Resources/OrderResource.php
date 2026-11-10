<?php

namespace App\Filament\Resources;

use App\Filament\Resources\OrderResource\Pages;
use App\Models\Order;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class OrderResource extends Resource
{
    protected static ?string $model = Order::class;
    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart';
    protected static ?string $navigationLabel = 'Órdenes';
    protected static ?string $modelLabel = 'Orden';
    protected static ?string $pluralModelLabel = 'Órdenes';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Información de la orden')
                    ->schema([
                        Forms\Components\TextInput::make('order_number')
                            ->label('Número de Orden')
                            ->disabled(),
                        Forms\Components\TextInput::make('retiro_code')
                            ->label('Código de Retiro')
                            ->disabled(),
                        Forms\Components\Select::make('status')
                            ->label('Estado')
                            ->options([
                                'PENDIENTE' => 'Pendiente',
                                'PAGADO' => 'Pagado',
                                'PREPARANDO' => 'Preparando',
                                'LISTO_RETIRO' => 'Listo para Retiro',
                                'ENTREGADO' => 'Entregado',
                                'AGENDADO' => 'Agendado',
                                'COMPLETADO' => 'Completado',
                                'CANCELADO' => 'Cancelado',
                                'REEMBOLSADO' => 'Reembolsado',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('total')
                            ->label('Total')
                            ->prefix('$')
                            ->numeric()
                            ->disabled(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Cliente')
                    ->schema([
                        Forms\Components\TextInput::make('customer_name')
                            ->label('Nombre')
                            ->disabled(),
                        Forms\Components\TextInput::make('customer_email')
                            ->label('Email')
                            ->email()
                            ->disabled(),
                        Forms\Components\TextInput::make('customer_phone')
                            ->label('Teléfono')
                            ->disabled(),
                        Forms\Components\TextInput::make('customer_rut')
                            ->label('RUT')
                            ->disabled(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Pago')
                    ->schema([
                        Forms\Components\TextInput::make('transaction_id')
                            ->label('ID Transacción')
                            ->disabled(),
                        Forms\Components\DateTimePicker::make('paid_at')
                            ->label('Fecha de Pago')
                            ->disabled(),
                        Forms\Components\TextInput::make('authorization_code')
                            ->label('Código de Autorización')
                            ->disabled(),
                        Forms\Components\TextInput::make('card_number')
                            ->label('Número de Tarjeta')
                            ->disabled(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Items')
                    ->schema([
                        Forms\Components\Repeater::make('items')
                            ->relationship('items')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->label('Nombre')
                                    ->required(),
                                Forms\Components\TextInput::make('price')
                                    ->label('Precio')
                                    ->prefix('$')
                                    ->numeric()
                                    ->required(),
                                Forms\Components\TextInput::make('quantity')
                                    ->label('Cantidad')
                                    ->numeric()
                                    ->default(1)
                                    ->required(),
                                Forms\Components\Select::make('type')
                                    ->label('Tipo')
                                    ->options([
                                        'producto' => 'Producto',
                                        'tratamiento' => 'Tratamiento',
                                        'consulta' => 'Consulta',
                                    ])
                                    ->default('producto'),
                            ])
                            ->columns(4)
                            ->addActionLabel('Agregar item'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('order_number')
                    ->label('N° Orden')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('customer_name')
                    ->label('Cliente')
                    ->searchable(),
                Tables\Columns\TextColumn::make('customer_email')
                    ->label('Email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('total')
                    ->label('Total')
                    ->money('CLP')
                    ->sortable(),
                Tables\Columns\BadgeColumn::make('status')
                    ->label('Estado')
                    ->colors([
                        'warning' => 'PENDIENTE',
                        'success' => ['PAGADO', 'COMPLETADO'],
                        'primary' => ['PREPARANDO', 'AGENDADO'],
                        'danger' => ['CANCELADO', 'REEMBOLSADO'],
                    ]),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Fecha')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->label('Estado')
                    ->options([
                        'PENDIENTE' => 'Pendiente',
                        'PAGADO' => 'Pagado',
                        'PREPARANDO' => 'Preparando',
                        'LISTO_RETIRO' => 'Listo para Retiro',
                        'ENTREGADO' => 'Entregado',
                        'AGENDADO' => 'Agendado',
                        'COMPLETADO' => 'Completado',
                        'CANCELADO' => 'Cancelado',
                        'REEMBOLSADO' => 'Reembolsado',
                    ]),
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('created_from')
                            ->label('Desde'),
                        Forms\Components\DatePicker::make('created_until')
                            ->label('Hasta'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when($data['created_from'], fn(Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date))
                            ->when($data['created_until'], fn(Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date));
                    }),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListOrders::route('/'),
            'create' => Pages\CreateOrder::route('/create'),
            'view' => Pages\ViewOrder::route('/{record}'),
            'edit' => Pages\EditOrder::route('/{record}/edit'),
        ];
    }
}
