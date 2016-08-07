
using AngularJsAspNet.Models;
using System.Collections.Generic;

namespace AngularJsAspNet.Contracts.Services
{
    public interface ICRUDService<TEntity> : IServiceBase where TEntity : class
    {
        IEnumerable<TEntity> List(int currentPage, int maxSize, string sortColumn, string sort);

        TEntity GetById(int id);

        void Insert(TEntity autor);

        void Update(TEntity autor);

        void Delete(TEntity autor);

        int Total();
    }
}
