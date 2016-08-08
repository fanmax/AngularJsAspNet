using AngularJsAspNet.Contracts.Services;
using AngularJsAspNet.Models;
using System;
using System.Web.Mvc;

namespace AngularJsAspNet.Controllers
{
    public class LivrosController : Controller
    {
        private readonly ILivroService _livroService;

        public LivrosController(ILivroService livroService)
        {
            this._livroService = livroService;
        }

        [HttpPost]
        public JsonResult list()
        {

            var filter = Request.Form["filter"];
            int currentPage = Convert.ToInt32(Request.Form["currentPage"] == null ? "1" : Request.Form["currentPage"]);
            int maxSize = Convert.ToInt32(Request.Form["maxSize"] == null ? "10" : Request.Form["maxSize"]);
            string sortColumn = Request.Form["sortColumn"] == null ? "Id": Request.Form["sortColumn"];
            string sort = Request.Form["sort"] == null ? "asc" : Request.Form["sort"];
            var totalItems = this._livroService.Total();
            var livros = this._livroService.List(currentPage, maxSize, sortColumn, sort);                        
            return Json(new{ livros, totalItems},JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult add()
        {
            var livro = new Livro();
            livro.Id = Convert.ToInt32(Request.Form["Id"]);
            livro.Titulo = Request.Form["Titulo"];
            livro.Quantidade = Convert.ToInt32(Request.Form["Quantidade"]);
            livro.Valor = Convert.ToDecimal(Request.Form["Valor"]);
            livro.AutorId = Convert.ToInt32(Request.Form["AutorId"]);
            livro.GeneroId = Convert.ToInt32(Request.Form["GeneroId"]);
            this._livroService.Insert(livro);
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult edit()
        {
            var livro = new Livro();
            livro.Id = Convert.ToInt32(Request.Form["Id"]);
            livro.Titulo = Request.Form["Titulo"];
            livro.Quantidade = Convert.ToInt32(Request.Form["Quantidade"]);
            livro.Valor = Convert.ToDecimal(Request.Form["Valor"]);
            livro.AutorId = Convert.ToInt32(Request.Form["AutorId"]);
            livro.GeneroId = Convert.ToInt32(Request.Form["GeneroId"]);
            this._livroService.Update(livro);
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult remove()
        {
            var livro = new Livro();
            livro.Id = Convert.ToInt32(Request.Form["Id"]);
            livro.Titulo = Request.Form["Nome"];
            this._livroService.Delete(livro);
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}