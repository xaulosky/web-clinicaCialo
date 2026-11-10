<?php

namespace App\Filament\Resources;

use App\Filament\Resources\AffiliateResource\Pages;
use App\Models\Affiliate;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class AffiliateResource extends Resource
{
    protected static ?string $model = Affiliate::class;
    protected static ?string $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationLabel = 'Afiliados';
    protected static ?string $modelLabel = 'Afiliado';
    protected static ?string $pluralModelLabel = 'Afiliados';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Información Personal')
                    ->schema([
                        Forms\Components\TextInput::make('nombre')
                            ->label('Nombre')
                            ->required()
                            ->maxLength(100),
                        Forms\Components\TextInput::make('email')
                            ->label('Email')
                            ->required()
                            ->email()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('telefono')
                            ->label('Teléfono')
                            ->maxLength(20),
                        Forms\Components\TextInput::make('rut')
                            ->label('RUT')
                            ->maxLength(20),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Código y Comisión')
                    ->schema([
                        Forms\Components\TextInput::make('codigo_afiliado')
                            ->label('Código de Afiliado')
                            ->required()
                            ->maxLength(20)
                            ->unique(ignoreRecord: true),
                        Forms\Components\TextInput::make('comision_default')
                            ->label('Comisión por defecto (%)')
                            ->required()
                            ->numeric()
                            ->default(10),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Datos Bancarios')
                    ->schema([
                        Forms\Components\TextInput::make('banco')
                            ->label('Banco')
                            ->maxLength(50),
                        Forms\Components\Select::make('tipo_cuenta')
                            ->label('Tipo de Cuenta')
                            ->options([
                                'corriente' => 'Cuenta Corriente',
                                'vista' => 'Cuenta Vista',
                                'ahorro' => 'Cuenta de Ahorro',
                            ]),
                        Forms\Components\TextInput::make('numero_cuenta')
                            ->label('Número de Cuenta')
                            ->maxLength(50),
                    ])
                    ->columns(3),

                Forms\Components\Section::make('Estadísticas')
                    ->schema([
                        Forms\Components\TextInput::make('total_ventas')
                            ->label('Total Ventas')
                            ->prefix('$')
                            ->numeric()
                            ->default(0)
                            ->disabled(),
                        Forms\Components\TextInput::make('total_comisiones')
                            ->label('Total Comisiones')
                            ->prefix('$')
                            ->numeric()
                            ->default(0)
                            ->disabled(),
                        Forms\Components\TextInput::make('comisiones_pagadas')
                            ->label('Comisiones Pagadas')
                            ->prefix('$')
                            ->numeric()
                            ->default(0)
                            ->disabled(),
                    ])
                    ->columns(3),

                Forms\Components\Toggle::make('activo')
                    ->label('Activo')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('codigo_afiliado')
                    ->label('Código')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('nombre')
                    ->label('Nombre')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('email')
                    ->label('Email')
                    ->searchable(),
                Tables\Columns\TextColumn::make('total_ventas')
                    ->label('Ventas')
                    ->money('CLP')
                    ->sortable(),
                Tables\Columns\TextColumn::make('total_comisiones')
                    ->label('Comisiones')
                    ->money('CLP')
                    ->sortable(),
                Tables\Columns\IconColumn::make('activo')
                    ->label('Activo')
                    ->boolean(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Registro')
                    ->dateTime('d/m/Y')
                    ->sortable(),
            ])
            ->filters([
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
            'index' => Pages\ListAffiliates::route('/'),
            'create' => Pages\CreateAffiliate::route('/create'),
            'edit' => Pages\EditAffiliate::route('/{record}/edit'),
        ];
    }
}
