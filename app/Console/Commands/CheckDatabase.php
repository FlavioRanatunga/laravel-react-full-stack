<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CheckDatabase extends Command
{
    protected $signature = 'db:check';
    protected $description = 'Check the database contents';

    public function handle()
    {
        $this->info('Checking users table:');
        $users = DB::table('users')->get();
        foreach ($users as $user) {
            $this->line("ID: {$user->id}, Name: {$user->name}, Email: {$user->email}");
        }
    }
} 