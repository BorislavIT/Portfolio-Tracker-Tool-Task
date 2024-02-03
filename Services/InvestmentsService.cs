﻿using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Models;
using Server.DTOs;

namespace Services
{
    public class InvestmentsService : IInvestmentsService
    {
        private readonly AppDbContext dbContext;
        private readonly IMapper mapper;

        public InvestmentsService(AppDbContext dbContext, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        public async Task<InvestmentDTO> CreateInvestment(InvestmentDTO investment)
        {
            investment.DateOfCreation = DateTime.UtcNow;
            var mappedInvestment = this.mapper.Map<Investment>(investment);
            await this.dbContext.Investments.AddAsync(mappedInvestment);
            await this.dbContext.SaveChangesAsync();

            return this.mapper.Map<InvestmentDTO>(mappedInvestment);
        }

        public async Task<List<InvestmentDTO>> GetInvestments()
        {
            return await this.dbContext.Investments.Select(i => this.mapper.Map<InvestmentDTO>(i)).ToListAsync();
        }
    }
}