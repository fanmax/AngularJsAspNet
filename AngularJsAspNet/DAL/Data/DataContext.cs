using AngularJsAspNet.Models;
using System.Data.Entity;

namespace AngularJsAspNet.Dal.Data
{
    public class DataContext: DbContext
    {

        static DataContext()
        {
            Database.SetInitializer<DataContext>(null);
        }
        public DataContext()
            : base("name=DefaultConnection")
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            Database.SetInitializer<DataContext>(new CreateDatabaseIfNotExists<DataContext>());

            //modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Properties<string>().Configure(p => p.HasMaxLength(100));                      
        }

        public DbSet<Autor> Autores { get; set; }
        public DbSet<Genero> Generos { get; set; }
        public DbSet<Livro> Livros { get; set; }
    }
}