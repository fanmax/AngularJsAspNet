using AngularJsAspNet.Contracts.Services;
using AngularJsAspNet.Models;
using System;
using System.Web.Mvc;

namespace AngularJsAspNet.Controllers
{
    public class GenerosController : Controller
    {
        private readonly IGeneroService _generoService;

        public GenerosController(IGeneroService generoService)
        {
            this._generoService = generoService;
        }

        [HttpPost]
        public JsonResult list()
        {
            int currentPage = Convert.ToInt32(Request.Form["currentPage"] == null ? "1" : Request.Form["currentPage"]);
            int maxSize = Convert.ToInt32(Request.Form["maxSize"] == null ? "10" : Request.Form["maxSize"]);
            string sortColumn = Request.Form["sortColumn"] == null ? "Id": Request.Form["sortColumn"];
            string sort = Request.Form["sort"] == null ? "asc" : Request.Form["sort"];
            var totalItems = this._generoService.Total();
            var generos = this._generoService.List(currentPage, maxSize, sortColumn, sort);
            //var generos = db.Generos.OrderBy(campOrder).Skip((currentPage - 1) * maxSize).Take(maxSize).ToList();            
            return Json(new{ generos, totalItems},JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult add()
        {
            var genero = new Genero();
            genero.Nome = Request.Form["Nome"];
            this._generoService.Insert(genero);
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult edit()
        {
            var genero = new Genero();
            genero.Id = Convert.ToInt32(Request.Form["Id"]);
            genero.Nome = Request.Form["Nome"];
            this._generoService.Update(genero);
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult remove()
        {
            var genero = new Genero();
            genero.Id = Convert.ToInt32(Request.Form["Id"]);
            genero.Nome = Request.Form["Nome"];
            this._generoService.Delete(genero);
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}