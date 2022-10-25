using Microsoft.EntityFrameworkCore;

namespace ToDoApp.Data.Managers
{
    public class TaskManager : ITaskManager
    {
        private ApplicationDbContext _context;
        public TaskManager(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<bool> createTask(Models.Task model)
        {
            try
            {
                model.CreatedDate = DateTime.Now;
                model.Status = 0;
                await _context.Tasks.AddAsync(model);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<Models.Task> updateTask(Models.Task model)
        {
            try
            {
                model.UpdatedDate = DateTime.Now;
                if (model.Status == 1) { 
                    model.CompletionDate = DateTime.Now;
                }
                var mo_ent = _context.Tasks.Update(model).CurrentValues;
                await _context.SaveChangesAsync();
                var mo_obj = new Models.Task()
                {
                    Id = mo_ent.GetValue<int>("Id"),
                    Name = mo_ent.GetValue<string>("Name"),
                    CreatedDate = mo_ent.GetValue<DateTime>("CreatedDate"),
                    Description = mo_ent.GetValue<string>("Description"),
                    CompletionDate = mo_ent.GetValue<DateTime>("CompletionDate"),
                    UpdatedDate = mo_ent.GetValue<DateTime>("UpdateDate"),
                    UserId = mo_ent.GetValue<string>("UserId")
                };

                return mo_obj;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<bool> deleteTask(Models.Task model)
        {
            try
            {
                _context.Tasks.Remove(model);
                await _context.SaveChangesAsync();
                return true;
            }
            catch
            {

                return false;
            }
        }
        public async Task<List<Models.Task>> getTaskByUser(string UserId) { 
            var result=from task in _context.Tasks where task.UserId == UserId select task;
            return await result.ToListAsync<Models.Task>();
        }
        public Models.Task getTaskById(int Id) { 
            var result= _context.Tasks.FirstOrDefault(task => task.Id == Id);
            return result;
        }
    }
}
