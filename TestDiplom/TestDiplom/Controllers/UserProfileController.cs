﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestDiplom.Models;

namespace TestDiplom.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        
        
        [HttpGet]
        [Authorize]
        //Get : /api/UserProfile
        public async Task<ApplicationUserModel> GetUserProfile()
        {
            string userId = User.Claims.FirstOrDefault(c => c.Type == "UserID").Value;

            var user = await _userManager.FindByIdAsync(userId);

            var role = await _userManager.GetRolesAsync(user);

            var a = new ApplicationUserModel
            {
                //FullName = user.FullName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Patronymic = user.Patronymic,
                Email = user.Email,
                UserName = user.UserName,
                PhoneNumber = user.PhoneNumber,
                IsBlocked = user.IsBlocked,
                ImgPath = user.ImgPath,
                Role = role.Count > 0 ? role.FirstOrDefault() : null
            };

            return a;
        }

        [HttpGet]
        [Authorize]
        [Route("GetAll")]
        //Get : /api/GetAll
        public async Task<List<UserModel>> GetAll()
        {
            var users = await _userManager.Users.Where(u => u.UserName != "Admin").ToListAsync();

            List<UserModel> userLst = new List<UserModel>();

            foreach (var i in users)
            {
                var user = new UserModel();

                user.Id = i.Id;
                user.UserName = i.UserName;
                //user.FullName = i.FullName;
                user.FirstName = i.FirstName ?? "";
                user.LastName = i.LastName ?? "";
                user.Patronymic = i.Patronymic ?? "";
                user.Email = i.Email;
                user.PhoneNumber = i.PhoneNumber;
                user.IsBlocked = i.IsBlocked;

                userLst.Add(user);
            }

            return userLst;
        }

        [HttpGet]
        [Authorize]
        [Route("GetById")]
        //Get : /api/GetById
        public async Task<UserModel> GetById(string id)
        {
            var u = await _userManager.FindByIdAsync(id);
            var role = await _userManager.GetRolesAsync(u);

            var user = new UserModel();

            user.Id = u.Id;
            user.UserName = u.UserName;
            //user.FullName = u.FullName;
            user.FirstName = u.FirstName;
            user.LastName = u.LastName;
            user.Patronymic = u.Patronymic;
            user.Email = u.Email;
            user.PhoneNumber = u.PhoneNumber;
            user.IsBlocked = u.IsBlocked;
            user.Role = role.FirstOrDefault();
            
            return user;
        }

        [HttpPost]
        [Authorize]
        [Route("Update")]
        //POST : /api/UserProfile/Update

        public async Task<IActionResult> EditUserProfile(ApplicationUserModel userProfile)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;

            var user = await _userManager.FindByIdAsync(userId);

            //user.FullName = userProfile.FullName;
            user.FirstName = userProfile.FirstName;
            user.LastName = userProfile.LastName;
            user.Patronymic = userProfile.Patronymic;
            user.Email = userProfile.Email;
            user.UserName = userProfile.UserName;
            user.PhoneNumber = userProfile.PhoneNumber;
            user.ImgPath = userProfile.ImgPath;
            try
            {
                var result = await _userManager.UpdateAsync(user);

                return Ok(result);
            }
            
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Authorize]
        [Route("UpdateUser")]
        //POST : /api/UserProfile/UpdatedUser
        public async Task<IActionResult> UpdateUser(ApplicationUserModel model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            var removedRole = await _userManager.GetRolesAsync(user);

            //user.FullName = model.FullName;
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Patronymic = model.Patronymic;
            user.Email = model.Email;
            user.UserName = model.UserName;
            user.PhoneNumber = model.PhoneNumber;

            try
            {
                await _userManager.RemoveFromRolesAsync(user, removedRole);
                await _userManager.AddToRoleAsync(user, model.Role);
                var result = await _userManager.UpdateAsync(user);

                return Ok(result);
            }

            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        [Authorize]
        [Route("BlockAndUnBlockUser")]
        //POST : /api/UserProfile/BlockAndUnBlockUser
        public async Task<bool?> BlockAndUnBlockUser(UserModel model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);

            if (user.IsBlocked == true)
                user.IsBlocked = false;
            else
                user.IsBlocked = true;
            try
            {
                await _userManager.UpdateAsync(user);

                return user.IsBlocked;
            }

            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpDelete]
        [Authorize]
        [Route("Delete")]
        //Delete : /api/UserProfile/Delete
        public async Task Delete(string id)
        {
            var deleteItem = await _userManager.FindByIdAsync(id);

            await _userManager.DeleteAsync(deleteItem);

            if (deleteItem != null)
            {
                await _userManager.DeleteAsync(deleteItem);
            }
        }

        [HttpGet]
        [Authorize(Roles = "Teacher")]
        [Route("ForTeacher")]
        public string GetForTeacher()
        {
            return "Web method for Teacher";
        }
        [HttpGet]
        [Authorize(Roles = "Student")]
        [Route("ForStudent")]
        public string GetForStudent()
        {
            return "Web method for Student";
        }
        [HttpGet]
        [Authorize(Roles = "Teacher, Student")]
        [Route("ForTeacherOrStudent")]
        public string GetForTeacherOrStudent()
        {
            return "Web method for Teacher or Student";
        }

    }
}
