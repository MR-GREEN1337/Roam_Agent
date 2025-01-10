from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    """Base Settings of the backend"""
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
    
    # CORS
    ALLOWED_ORIGINS: list[str]
    SECRET_KEY: str

    # Groq
    GROQ_API_KEY: str

    # Database
    DATABASE_URL: str

settings = Settings()