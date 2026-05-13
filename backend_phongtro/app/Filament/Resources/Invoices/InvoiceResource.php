<?php

namespace App\Filament\Resources\Invoices;

use App\Filament\Resources\Invoices\Pages;
use App\Models\Invoice;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Schemas\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\DateTimePicker;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Actions\EditAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Actions\Action;
use App\Filament\Resources\Invoices\InvoiceResource\RelationManagers\DetailsRelationManager;
use App\Filament\Resources\Invoices\InvoiceResource\RelationManagers\PaymentsRelationManager;

class InvoiceResource extends Resource
{
    protected static ?string $model = Invoice::class;

    protected static string|\BackedEnum|null $navigationIcon = 'heroicon-o-receipt-percent';
    protected static ?string $navigationLabel = 'Hóa Đơn';
    protected static ?string $modelLabel = 'Hóa đơn';
    protected static ?string $pluralModelLabel = 'Danh sách Hóa đơn';
    protected static string|\UnitEnum|null $navigationGroup = 'Quản lý Thuê';

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Thông tin thu tiền')
                    ->columns(2)
                    ->schema([
                        Select::make('contract_id')
                            ->label('Mã Hợp đồng')
                            ->relationship('contract', 'id')
                            ->required(),

                        TextInput::make('month')
                            ->label('Tháng')
                            ->numeric()
                            ->minValue(1)
                            ->maxValue(12)
                            ->required(),

                        TextInput::make('year')
                            ->label('Năm')
                            ->numeric()
                            ->required(),

                        TextInput::make('total_amount')
                            ->label('Tổng tiền (VNĐ)')
                            ->numeric()
                            ->required()
                            ->default(0),

                        Select::make('status')
                            ->label('Trạng thái')
                            ->options([
                                'pending' => 'Chưa thanh toán',
                                'paid' => 'Đã thanh toán',
                                'overdue' => 'Quá hạn',
                            ])
                            ->default('pending')
                            ->required(),

                        DateTimePicker::make('paid_at')
                            ->label('Ngày thanh toán')
                            ->native(false),
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('contract_id')
                    ->label('Mã Hợp đồng')
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('month')
                    ->label('Tháng')
                    ->sortable(),

                TextColumn::make('year')
                    ->label('Năm')
                    ->sortable(),

                TextColumn::make('total_amount')
                    ->label('Tổng tiền')
                    ->money('VND')
                    ->sortable()
                    ->color('primary'),

                TextColumn::make('status')
                    ->label('Trạng thái')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending' => 'warning',
                        'paid' => 'success',
                        'overdue' => 'danger',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'pending' => 'Chưa thanh toán',
                        'paid' => 'Đã thanh toán',
                        'overdue' => 'Quá hạn',
                        default => $state,
                    }),

                TextColumn::make('paid_at')
                    ->label('Ngày thanh toán')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([])
            ->recordActions([
                EditAction::make()->label('Sửa'),
                DeleteAction::make()->label('Xóa'),
                \Filament\Actions\Action::make('print')
                    ->label('In PDF')
                    ->icon('heroicon-o-printer')
                    ->color('success')
                    ->action(function ($record) {
                        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('pdf.invoice', ['invoice' => $record]);
                        return response()->streamDownload(
                            fn () => print($pdf->output()),
                            "hoa-don-{$record->id}.pdf"
                        );
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()->label('Xóa đã chọn'),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            DetailsRelationManager::class,
            PaymentsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListInvoices::route('/'),
            'create' => Pages\CreateInvoice::route('/create'),
            'edit' => Pages\EditInvoice::route('/{record}/edit'),
        ];
    }
}