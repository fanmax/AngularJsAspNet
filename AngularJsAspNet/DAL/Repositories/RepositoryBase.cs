using AngularJsAspNet.Contracts.Repositories;
using AngularJsAspNet.Dal.Data;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Dynamic;

namespace AngularJsAspNet.DAL.Repositories
{
    public class RepositoryBase<TEntity> : IDisposable, IRepositoryBase<TEntity> where TEntity : class
    {
        protected DataContext Db = new DataContext();

        public void Commit()
        {
            Db.SaveChanges();
        }

        public void Insert(TEntity obj)
        {
            Db.Set<TEntity>().Add(obj);
            this.Commit();
        }

        public void Update(TEntity obj)
        {
            Db.Entry(obj).State = EntityState.Modified;
            this.Commit();
        }

        public TEntity GetById(int id)
        {
            return Db.Set<TEntity>().Find(id);
        }

        public IEnumerable<TEntity> GetAll(int currentPage, int maxSize, string sortColumn, string sort)
        {
            //Db.Set<TEntity>();

            if (currentPage <= 0) currentPage = 1;
            if (maxSize <= 0) maxSize = this.Total();

            string sortDefine = String.Format("{0} {1}", sortColumn, sort);

            if (sortColumn == null && maxSize == this.Total())
                return Db.Set<TEntity>().ToList();

            return Db.Set<TEntity>().OrderBy(sortDefine).Skip((currentPage - 1) * maxSize).Take(maxSize).ToList();
        }

        public void Delete(TEntity obj)
        {
            Db.Entry(obj).State = EntityState.Deleted;
            this.Commit();
        }

        public int Total()
        {
            return Db.Set<TEntity>().Count();
        }

        public void Dispose()
        {
            Db.Dispose();
        }
    }
}