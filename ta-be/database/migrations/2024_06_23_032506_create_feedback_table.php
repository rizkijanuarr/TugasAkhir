<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
   {
       Schema::create('feedback', function (Blueprint $table) {
           $table->id();
           $table->foreignId('user_id')->references('id')->on('users')->cascadeOnDelete();
           $table->integer('rating');
           $table->text('comments');
           $table->timestamps();
       });

       Schema::create('feedback_improvements', function (Blueprint $table) {
           $table->foreignId('feedback_id')->references('id')->on('feedback')->cascadeOnDelete();
           $table->foreignId('improvement_id')->references('id')->on('improvements')->cascadeOnDelete();
       });
   }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('feedback_improvements');
        Schema::dropIfExists('feedback');
    }
};
