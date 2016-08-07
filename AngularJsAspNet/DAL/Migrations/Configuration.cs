namespace AngularJsAspNet.DAL.Migrations
{
    using Dal.Data;
    using Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            SetSqlGenerator("MySql.Data.MySqlClient", new MySql.Data.Entity.MySqlMigrationSqlGenerator());
        }

        protected override void Seed(DataContext context)
        {
            context.Autores.AddOrUpdate(
                a => a.Nome,
                new Autor { Nome = "Rodrigo"},
                new Autor { Nome = "Paulo" },
                new Autor { Nome = "Roberto" },
                new Autor { Nome = "Fernando" },
                new Autor { Nome = "Fábio" },
                new Autor { Nome = "José" },
                new Autor { Nome = "João" },
                new Autor { Nome = "Roberta" },
                new Autor { Nome = "Geralda" },
                new Autor { Nome = "Ana" },
                new Autor { Nome = "Angélica" },
                new Autor { Nome = "Jessica" }
                );

            context.Generos.AddOrUpdate(
                a => a.Nome,
                new Genero { Nome = "Romance" },
                new Genero { Nome = "Programação" }                   
                );
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}
