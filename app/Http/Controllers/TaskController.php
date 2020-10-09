<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Task;

use function GuzzleHttp\Promise\task;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::get();
        return $tasks;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'task' => 'required'
        ]);
        if (
            $new_task = Task::create([
            'task' => request('task')
        ])) return response()->json($new_task);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'done' => 'required'
        ]);
        if ($task=Task::find(request('id'))){
            if (request('id') == 'true') {
                $done = true;
            } else $done = false;
            $task->update([
                'done' => $done
            ]);
            return response()->json([
                'status' => 'Update success.'
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $request->validate([
            'id' => 'required',
        ]);
        if( $task=Task::find(request('id'))){
            $task->delete();
            return response()->json([
                'status' => 'Delete success.'
            ]);
        }
    }
}
