using TaskModel = ToDoApp.Data.Models.Task;
namespace ToDoApp.Data.Managers
{
    public interface ITaskManager
    {
        public Task<bool> createTask(TaskModel model);
        public Task<TaskModel> updateTask(TaskModel model);
        public Task<bool> deleteTask(TaskModel model);
        public Task<List<TaskModel>> getTaskByUser(string UserId);
        public TaskModel getTaskById(int Id);
    }
}
