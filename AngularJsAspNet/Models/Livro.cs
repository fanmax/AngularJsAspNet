using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularJsAspNet.Models
{
    [Table("Livros")]
    public class Livro
    {
        public int Id { get; set; }
        [MaxLength(150)]
        public string Titulo { get; set; }
        public decimal Valor { get; set; }
        public int Quantidade { get; set; }

        public virtual Autor Autores { get; set; }
        public int AutorId { get; set; }

        public virtual Genero Generos { get; set; }
        public int GeneroId { get; set; }
    }
}