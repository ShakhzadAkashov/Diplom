using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestDiplom.Models;
using TestDiplom.Models.Lecture;

namespace TestDiplom.Controllers.lecture
{
    [Route("api/[controller]")]
    [ApiController]
    public class LectureController : ControllerBase
    {
        private AuthenticationContext _context;
        public LectureController(AuthenticationContext context)
        {
            _context = context;
        }

        [HttpPost]
        [Authorize]
        [Route("CreateLecture")]
        //POST : /api/Lecture/CreateLecture
        public async Task<Object> CreateLecture(LectureModel model)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;

            var lecture = new Lecture()
            {
                Name = model.Name,
                Content = model.Content,
                OwnerId = userId,
            };
            try
            {
                await _context.Lectures.AddAsync(lecture);
                await _context.SaveChangesAsync();

                var Id = lecture.Id;

                await InsertFiles(model.LectureFiles,Id);

                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        protected async Task InsertFiles(IList<LectureFile> files, int id)
        {
            for (int i = 0; i < files.Count; i++)
            {
                var file = new LectureFile
                {
                    FileName = files[i].FileName,
                    Path = files[i].Path,
                    LectureId = id,
                };

                await _context.LectureFiles.AddAsync(file);
                await _context.SaveChangesAsync();
            }
        }
    }
}
