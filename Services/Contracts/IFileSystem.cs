﻿namespace Services
{
    public interface IFileService
    {
        Task<string> ReadAllTextAsync(string path);
        Task WriteAllTextAsync(string path, string contents);
        bool Exists(string path);
    }
}