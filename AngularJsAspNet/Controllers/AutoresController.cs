using AngularJsAspNet.Contracts.Services;
using AngularJsAspNet.Models;
using System;
using System.Web.Mvc;

namespace AngularJsAspNet.Controllers
{
    public class AutoresController : Controller
    {
        private readonly IAutorService _autorService;

        public AutoresController(IAutorService autorService)
        {
            this._autorService = autorService;
        }

        [HttpPost]
        public JsonResult list()
        {
            int currentPage = Convert.ToInt32(Request.Form["currentPage"] == null ? "1" : Request.Form["currentPage"]);
            int maxSize = Convert.ToInt32(Request.Form["maxSize"] == null ? "10" : Request.Form["maxSize"]);
            string sortColumn = Request.Form["sortColumn"] == null ? "Id": Request.Form["sortColumn"];
            string sort = Request.Form["sort"] == null ? "asc" : Request.Form["sort"];
            var totalItems = this._autorService.Total();
            var autores = this._autorService.List(currentPage, maxSize, sortColumn, sort);
            //var autores = db.Autores.OrderBy(campOrder).Skip((currentPage - 1) * maxSize).Take(maxSize).ToList();            
            return Json(new{ autores, totalItems},JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult add()
        {
            var autor = new Autor();
            autor.Nome = Request.Form["Nome"];
            this._autorService.Insert(autor);
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult edit()
        {
            var autor = new Autor();
            autor.Id = Convert.ToInt32(Request.Form["Id"]);
            autor.Nome = Request.Form["Nome"];
            this._autorService.Update(autor);
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult remove()
        {
            var autor = new Autor();
            autor.Id = Convert.ToInt32(Request.Form["Id"]);
            autor.Nome = Request.Form["Nome"];
            this._autorService.Delete(autor);
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}