using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using ToDoApp.Models;

namespace ToDoApp.Data.Models
{
    [ValidateNever]
    public class Task
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public DateTime CompletionDate { get; set; }
        public int Status { get; set; }
        public string Description { get; set; }

        public string UserId { get; set; }
    }
}
