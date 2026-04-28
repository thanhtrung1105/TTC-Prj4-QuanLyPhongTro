<?php

namespace App\Filament\Resources\Tenants; // <-- 1. ĐÃ SỬA CHUẨN NAMESPACE (Có chữ Tenants)

use App\Filament\Resources\Tenants\Pages; // <-- Đã sửa đường dẫn Pages
use App\Models\Tenant;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

// <-- 2. ĐÃ CẬP NHẬT IMPORT CÁC NÚT BẤM THEO ĐÚNG CHUẨN MỚI
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;

class TenantResource extends Resource
{
    protected static ?string $model = Tenant::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-users';
    protected static ?string $navigationLabel = 'Khách Thuê';
    protected static ?string $modelLabel = 'Khách thuê';
    protected static ?string $pluralModelLabel = 'Danh sách Khách thuê';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Thông tin cá nhân')
                    ->description('Nhập thông tin liên hệ và giấy tờ tùy thân của khách')
                    ->icon('heroicon-o-identification')
                    ->columns(2)
                    ->schema([
                        TextInput::make('full_name')
                            ->label('Họ và tên')
                            ->required()
                            ->maxLength(255),

                        TextInput::make('cccd')
                            ->label('Số CCCD/CMND')
                            ->required()
                            ->maxLength(20),

                        TextInput::make('phone')
                            ->label('Số điện thoại liên hệ')
                            ->required()
                            ->tel()
                            ->maxLength(15),

                        TextInput::make('email')
                            ->label('Email (Tùy chọn)')
                            ->email()
                            ->maxLength(255),

                        TextInput::make('address')
                            ->label('Quê quán / Địa chỉ thường trú')
                            ->columnSpanFull()
                            ->maxLength(255),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('full_name')
                    ->label('Họ và tên')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('cccd')
                    ->label('Số CCCD')
                    ->searchable(),

                TextColumn::make('phone')
                    ->label('Số điện thoại')
                    ->searchable(),
                    
                TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('created_at')
                    ->label('Ngày thêm')
                    ->dateTime('d/m/Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                //
            ])
            ->recordActions([ // <-- 3. ĐÃ ĐỔI TÊN THÀNH recordActions
                EditAction::make()->label('Sửa'),
                DeleteAction::make()->label('Xóa'),
            ])
            ->toolbarActions([ // <-- 4. ĐÃ ĐỔI TÊN THÀNH toolbarActions
                BulkActionGroup::make([
                    DeleteBulkAction::make()->label('Xóa đã chọn'),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTenants::route('/'),
            'create' => Pages\CreateTenant::route('/create'),
            'edit' => Pages\EditTenant::route('/{record}/edit'),
        ];
    }
}