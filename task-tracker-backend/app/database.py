from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLite veritabanı URL'si
SQLALCHEMY_DATABASE_URL = "sqlite:///./tasks.db"

# SQLAlchemy engine oluştur
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}  # SQLite için gerekli
)

# Session factory oluştur
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base sınıf oluştur
Base = declarative_base()
