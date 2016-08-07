using System.Collections.Generic;

namespace AngularJsAspNet.Contracts.Repositories
{
    public interface IRepositoryBase<TEntity> where TEntity : class
    {

        void Commit();

        void Insert(TEntity obj);

        void Update(TEntity obj);

        TEntity GetById(int id);

        IEnumerable<TEntity> GetAll(int currentPage, int maxSize, string sortColumn, string sort);

        void Delete(TEntity obj);

        int Total();

        void Dispose();
    }
}