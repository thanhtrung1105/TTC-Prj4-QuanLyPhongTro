<?php

namespace App\Filament\Resources\Invoices\InvoiceResource\RelationManagers;

use Filament\Schemas\Schema; // Đã đổi Form thành Schema
use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Actions\CreateAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;

class DetailsRelationManager extends RelationManager
{
    protected static string $relationship = 'details'; 
    protected static ?string $title = 'Chi tiết các khoản thu';

    public function form(Schema $schema): Schema // Đã đổi Form thành Schema
    {
        return $schema
            ->components([ // Đã đổi ->schema([]) thành ->components([])
                TextInput::make('service_name')
                    ->label('Tên khoản thu (Điện, Nước, Rác...)')
                    ->required()
                    ->maxLength(255),
                    
                TextInput::make('quantity')
                    ->label('Số lượng (kWh, Khối, Tháng...)')
                    ->required()
                    ->numeric()
                    ->default(1),
                    
                TextInput::make('unit_price')
                    ->label('Đơn giá')
                    ->required()
                    ->numeric(),
                    
                TextInput::make('amount')
                    ->label('Thành tiền')
                    ->required()
                    ->numeric(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('service_name')
            ->columns([
                TextColumn::make('service_name')->label('Khoản thu')->weight('bold'),
                TextColumn::make('quantity')->label('Số lượng'),
                TextColumn::make('unit_price')->label('Đơn giá')->money('VND'),
                TextColumn::make('amount')->label('Thành tiền')->money('VND')->color('danger'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                CreateAction::make()->label('Thêm khoản thu'),
            ])
            ->actions([
                EditAction::make()->label('Sửa'),
                DeleteAction::make()->label('Xóa'),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()->label('Xóa đã chọn'),
                ]),
            ]);
    }
}