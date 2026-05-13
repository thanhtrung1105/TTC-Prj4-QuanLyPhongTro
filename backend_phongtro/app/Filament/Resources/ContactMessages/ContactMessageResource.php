<?php

namespace App\Filament\Resources\ContactMessages;

use App\Models\ContactMessage;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

class ContactMessageResource extends Resource
{
    protected static ?string $model = ContactMessage::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-envelope';
    protected static ?string $navigationLabel = 'Tin Nhắn Liên Hệ';
    protected static ?string $modelLabel = 'Tin nhắn';
    protected static ?string $pluralModelLabel = 'Tin nhắn liên hệ';
    protected static string|\UnitEnum|null $navigationGroup = 'Vận hành';
    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('fullname')
                    ->label('Họ tên')
                    ->disabled(),
                TextInput::make('email')
                    ->label('Email')
                    ->disabled(),
                TextInput::make('phone')
                    ->label('Số điện thoại')
                    ->disabled(),
                Textarea::make('message')
                    ->label('Nội dung')
                    ->disabled()
                    ->rows(5)
                    ->columnSpanFull(),
                Toggle::make('is_read')
                    ->label('Đã đọc'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('fullname')
                    ->label('Họ tên')
                    ->searchable()
                    ->weight('bold'),
                TextColumn::make('email')
                    ->label('Email')
                    ->searchable(),
                TextColumn::make('phone')
                    ->label('SĐT'),
                TextColumn::make('message')
                    ->label('Nội dung')
                    ->limit(50),
                IconColumn::make('is_read')
                    ->label('Đã đọc')
                    ->boolean(),
                TextColumn::make('created_at')
                    ->label('Ngày gửi')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([])
            ->recordActions([
                EditAction::make()->label('Xem'),
                DeleteAction::make()->label('Xóa'),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()->label('Xóa đã chọn'),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => \App\Filament\Resources\ContactMessages\ContactMessageResource\Pages\ListContactMessages::route('/'),
            'edit' => \App\Filament\Resources\ContactMessages\ContactMessageResource\Pages\EditContactMessage::route('/{record}/edit'),
        ];
    }
}
