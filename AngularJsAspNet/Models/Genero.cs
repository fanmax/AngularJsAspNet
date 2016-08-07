using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularJsAspNet.Models
{
    [Table("Generos")]
    public class Genero
    {
        public int Id { get; set; }
        [MaxLength(60)]
        public string Nome { get; set; }
    }
}