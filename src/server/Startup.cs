using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace server
{
    public class Startup
    {
        private const string ValidIssuer = "Redgate Versioning Web Server";
        private const string ValidAudience = "Redgate Versioning Web Client";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            SymmetricSecurityKey symmetricSecurityKey = GenerateJwtKey();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => { ConfigureJwtBearer(options, symmetricSecurityKey); });

            // write out a valid token to the console so our electron process can call methods
            var token = new JwtSecurityTokenHandler().WriteToken(
                new JwtSecurityToken(
                    ValidIssuer,
                    ValidAudience,
                    signingCredentials: new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256),
                    expires: DateTime.Now.Add(TimeSpan.FromDays(366))));

            Console.WriteLine($@"AuthToken: {token}");

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        private static SymmetricSecurityKey GenerateJwtKey()
        {
            // this isn't particularly secure; we probably want BouncyCastle's SecureRandom or something like that
            var keyBytes = new byte[512];
            new Random().NextBytes(keyBytes);
            return new SymmetricSecurityKey(keyBytes);
        }

        private static void ConfigureJwtBearer(JwtBearerOptions options, SymmetricSecurityKey symmetricSecurityKey)
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = ValidIssuer,
                ValidAudience = ValidAudience,
                IssuerSigningKey = symmetricSecurityKey
            };
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
