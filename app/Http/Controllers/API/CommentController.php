<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\Advertisement\AdvertisementResource;
use App\Http\Resources\CommentResource;
use App\Models\Advertisement;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Advertisement $advertisement)
    {
        $request->validate([
            'description' => 'required|string',
        ]);


        $comment = Comment::create([
            'user_id' => auth()->id(),
            'advertisement_id' => $advertisement->id,
            'description' => $request->description,
        ]);

        return response()->json(['message' => 'Добавихте коментар!', 'comment' => $comment], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
        return response()->json(['message' => 'Коментарът е изтрит!', 200]);
    }
}
