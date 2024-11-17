# Car Management System

This project is a comprehensive Car Management System, featuring a **frontend** built with Vite and React and a **backend** powered by Node.js. The system provides a seamless interface for managing cars, leveraging RESTful APIs for backend functionality.

## Table of Contents
1. [Overview](#overview)
2. [Project Links](#project-links)
3. [Authentication](#authentication)
4. [API Endpoints](#api-endpoints)
5. [Data Models](#data-models)
6. [Error Handling](#error-handling)

## Overview
The Car Management API provides a comprehensive solution for managing vehicle-related operations through RESTful endpoints. This documentation outlines the necessary information to understand and interact with the API effectively.

## Project Links

### Frontend Application
- **URL**: [Frontend Application](https://car-mgmt-app.netlify.app/)

### Backend Server
- **URL**: [Backend Server](https://car-management-system-85y2.onrender.com/)

### API Documentation
- **URL**: [Swagger Documentation](https://car-management-system-85y2.onrender.com/api/docs)

## Authentication

The API uses bearer token authentication. Upon successful login, you'll receive a token that must be included in the Authorization header of subsequent requests.

### Authentication Endpoints

#### Register New User
```http
POST /api/auth/register
```
**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```
**Responses:**
- `201`: User registered successfully
- `400`: Invalid input
- `500`: Unexpected Error

#### User Login
```http
POST /api/auth/login
```
**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Responses:**
- `200`: Login successful
- `400`: Invalid input
- `401`: Invalid credentials
- `500`: Unexpected Error

## API Endpoints

### Car Management

#### Create New Car
```http
POST /api/cars/create
```
**Authorization:** Bearer Token required

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "tags": ["string"],
  "images": ["string"]
}
```
**Responses:**
- `201`: Car created successfully
- `400`: Invalid request

#### List All Cars
```http
GET /api/cars
```
**Authorization:** Bearer Token required

**Responses:**
- `200`: Returns array of car objects
- `500`: Server error

#### Get Car by ID
```http
GET /api/cars/{id}
```
**Authorization:** Bearer Token required

**Parameters:**
- `id` (path): The car ID

**Responses:**
- `200`: Returns car details
- `404`: Car not found
- `500`: Unexpected Error

#### Update Car
```http
PUT /api/cars/{id}
```
**Authorization:** Bearer Token required

**Parameters:**
- `id` (path): The car ID

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "tags": ["string"],
  "images": ["string"]
}
```
**Responses:**
- `200`: Car updated successfully
- `404`: Car not found
- `500`: Unexpected Error

#### Delete Car
```http
DELETE /api/cars/{id}
```
**Authorization:** Bearer Token required

**Parameters:**
- `id` (path): The car ID

**Responses:**
- `200`: Car deleted successfully
- `404`: Car not found
- `500`: Unexpected Error

## Data Models

### Car Model
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "tags": ["string"],
  "images": ["string"],
  "user": "string"
}
```

### User Model
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

## Error Handling

The API uses standard HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `500`: Internal Server Error

---
