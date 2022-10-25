using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using ToDoApp.Data.Managers;
using TaskModel = ToDoApp.Data.Models.Task;
namespace ToDoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private ITaskManager _taskManager;
        public TaskController(ITaskManager taskmanager)
        {
            _taskManager = taskmanager;
        }

        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> listTaskByUser()
        {
            var list = await _taskManager.getTaskByUser(this.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            return Ok(list);

        }
        [HttpGet]
        [Route("{Id}")]
        public IActionResult taskById([FromRoute] int Id)
        {
            var task = _taskManager.getTaskById(Id);
            return Ok(task);

        }
        [HttpPost]
        [Route("update")]
        public async Task<IActionResult> updateTask([FromBody] TaskModel model)
        {
            await this._taskManager.updateTask(model);
            return Ok(model);
        }
        [HttpGet]
        [Route("delete/{Id}")]
        public async Task<IActionResult> deleteTask([FromRoute] int Id)
        {
            var task = _taskManager.getTaskById(Id);
            var result = await _taskManager.deleteTask(task);
            return Ok(result);
        }
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> createTask([FromBody] TaskModel model)
        {
            model.UserId = this.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result=await _taskManager.createTask(model);
            return Ok(result);
        }
    }
}
