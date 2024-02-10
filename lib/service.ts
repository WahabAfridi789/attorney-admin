"use server";
const API_URL = "http://localhost:4000/api";
import { Article, Attorney, FAQ, City, Review } from "@/types/type";
import { NextResponse, NextRequest } from "next/server";
interface ErrorResponse {
  status: string;
  message: string;
}

export async function createReview(
  cityData: Review,
  cityId: string
): Promise<Review | ErrorResponse> {
  try {
    const payload = {
      ...cityData,
      cityId,
    };
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error("Failed to create city");
    }
    return (await response.json()) as Review;
  } catch (error: any) {
    return { status: "Error", message: error.message } as ErrorResponse;
  }
}
export async function createCity(
  cityData: City
): Promise<City | ErrorResponse> {
  try {
    const response = await fetch(`${API_URL}/cities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cityData),
    });
    if (!response.ok) {
      throw new Error("Failed to create city");
    }
    return (await response.json()) as City;
  } catch (error: any) {
    return { status: "Error", message: error.message } as ErrorResponse;
  }
}

export async function getCities(page: string): Promise<{
  success?: boolean;
  data?: {
    response: City[];
    totalPages: number;
  };
  error?: ErrorResponse;
}> {
  try {
    const response = await fetch(`${API_URL}/cities?page=${page}`, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch cities");
    }
    const result = await response.json();
    return {
      success: true,
      data: {
        response: result.results as City[],
        totalPages: result.totalPages,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: { status: "Error", message: error.message } as ErrorResponse,
    };
  }
}

export async function getCityById(cityId: string): Promise<{
  success?: boolean;
  data?: City;
  error?: ErrorResponse;
}> {
  try {
    const response = await fetch(`${API_URL}/cities/${cityId}`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const result = await response.json();
    console.log("result", result);
    return { success: true, data: result as City };
  } catch (error: any) {
    return {
      success: false,
      error: { status: "Error", message: error.message } as ErrorResponse,
    };
  }
}

export async function updateCityById(
  cityId: string,
  updateData: Partial<City>
): Promise<City | ErrorResponse> {
  try {
    const response = await fetch(`${API_URL}/cities/${cityId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error("Failed to update city");
    }
    return (await response.json()) as City;
  } catch (error: any) {
    return { status: "Error", message: error.message } as ErrorResponse;
  }
}

export async function deleteCityById(
  cityId: string
): Promise<void | ErrorResponse> {
  try {
    const response = await fetch(`${API_URL}/${cityId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete city");
    }
  } catch (error: any) {
    return { status: "Error", message: error.message } as ErrorResponse;
  }
}
export async function createAttorney(
  attorneyData: Attorney
): Promise<Attorney | ErrorResponse> {
  try {
    const response = await fetch(`${API_URL}/attorneys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(attorneyData),
    });

    if (!response.ok) {
      throw new Error("Failed to create attorney");
    }

    return await response.json();
  } catch (error: any) {
    return { status: "Error", message: error.message };
  }
}

export async function updateAttorneyById(
  attorneyId: string,
  updateData: Partial<Attorney>
): Promise<Attorney | ErrorResponse> {
  try {
    const response = await fetch(`${API_URL}/attorneys/${attorneyId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error("Failed to update attorney");
    }
    return await response.json();
  } catch (error: any) {
    return { status: "Error", message: error.message };
  }
}

export async function deleteAttorneyById(
  attorneyId: string
): Promise<void | ErrorResponse> {
  try {
    const response = await fetch(`${API_URL}/attorneys/${attorneyId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete attorney");
    }
  } catch (error: any) {
    return { status: "Error", message: error.message };
  }
}

// Article Functions
export async function createArticle(
  articleData: Article
): Promise<Article | ErrorResponse> {
  try {
    const response = await fetch(`${API_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      throw new Error("Failed to create article");
    }

    return await response.json();
  } catch (error: any) {
    return { status: "Error", message: error.message };
  }
}

export async function updateArticleById(
  articleId: string,
  updateData: Partial<Article>
): Promise<Article | ErrorResponse> {
  try {
    const response = await fetch(`${API_URL}/articles/${articleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error("Failed to update article");
    }
    return await response.json();
  } catch (error: any) {
    return { status: "Error", message: error.message };
  }
}

export async function deleteArticleById(
  articleId: string
): Promise<void | ErrorResponse> {
  try {
    const response = await fetch(`${API_URL}/articles/${articleId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete article");
    }
  } catch (error: any) {
    return { status: "Error", message: error.message };
  }
}

// FAQ Functions
export async function createFAQ(faqData: FAQ): Promise<FAQ | ErrorResponse> {
  try {
    const response = await fetch(`${API_URL}/faqs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faqData),
    });

    if (!response.ok) {
      throw new Error("Failed to create FAQ");
    }

    return await response.json();
  } catch (error: any) {
    return { status: "Error", message: error.message };
  }
}

export async function getAllFAQs(): Promise<FAQ[] | ErrorResponse> {
  try {
    const response = await fetch(`${API_URL}/faqs`);
    if (!response.ok) {
      throw new Error("Failed to fetch FAQs");
    }
    return await response.json();
  } catch (error: any) {
    return { status: "Error", message: error.message };
  }
}

export async function getFAQById(faqId: string): Promise<FAQ | ErrorResponse> {
  try {
    const response = await fetch(`${API_URL}/faqs/${faqId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch FAQ");
    }
    return await response.json();
  } catch (error: any) {
    return { status: "Error", message: error.message };
  }
}

export async function updateFAQById(
  faqId: string,
  updateData: Partial<FAQ>
): Promise<FAQ | ErrorResponse> {
  try {
    const response = await fetch(`${API_URL}/faqs/${faqId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    if (!response.ok) {
      throw new Error("Failed to update FAQ");
    }
    return await response.json();
  } catch (error: any) {
    return { status: "Error", message: error.message };
  }
}

export async function deleteFAQById(
  faqId: string
): Promise<void | ErrorResponse> {
  try {
    const response = await fetch(`${API_URL}/faqs/${faqId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete FAQ");
    }
  } catch (error: any) {
    return { status: "Error", message: error.message };
  }
}

export async function getAttorneysByCityId(cityId: string): Promise<{
  success?: boolean;
  data?: Attorney[];
  error?: ErrorResponse;
}> {
  try {
    const response = await fetch(`${API_URL}/attorneys/city/${cityId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch attorneys by city ID");
    }
    const result = await response.json();
    return { success: true, data: result.response as Attorney[] };
  } catch (error: any) {
    return {
      success: false,
      error: { status: "Error", message: error.message } as ErrorResponse,
    };
  }
}

export async function getArticlesByCityId(cityId: string): Promise<{
  success?: boolean;
  data?: Article[];
  error?: ErrorResponse;
}> {
  try {
    const response = await fetch(`${API_URL}/articles/city/${cityId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch articles by city ID");
    }
    const result = await response.json();
    return { success: true, data: result.response as Article[] };
  } catch (error: any) {
    return {
      success: false,
      error: { status: "Error", message: error.message } as ErrorResponse,
    };
  }
}

export async function getAllFAQsByCityId(cityId: string): Promise<{
  success?: boolean;
  data?: FAQ[];
  error?: ErrorResponse;
}> {
  try {
    const response = await fetch(`${API_URL}/faqs/city/${cityId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch FAQs by city ID");
    }
    const result = await response.json();
    return { success: true, data: result.response as FAQ[] };
  } catch (error: any) {
    return {
      success: false,
      error: { status: "Error", message: error.message } as ErrorResponse,
    };
  }
}

export async function getReviewsByCityId(cityId: string): Promise<{
  success?: boolean;
  data?: Review[];
  error?: ErrorResponse;
}> {
  try {
    const response = await fetch(`${API_URL}/reviews/city/${cityId}`, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch reviews by city ID");
    }
    const result = await response.json();
    return { success: true, data: result.response as Review[] };
  } catch (error: any) {
    return {
      success: false,
      error: { status: "Error", message: error.message } as ErrorResponse,
    };
  }
}
export async function getTotalAttorneys(): Promise<{
  success: boolean;
  data?: number;
  error?: ErrorResponse;
}> {
  try {
    const response = await fetch(`${API_URL}/attorneys/count-attorneys`);
    if (!response.ok) {
      throw new Error("Failed to fetch total number of attorneys");
    }
    const totalAttorneys = await response.json();
    return { success: true, data: totalAttorneys.response };
  } catch (error: any) {
    return {
      success: false,
      error: { status: "Error", message: error.message },
    };
  }
}

export async function getTotalCities(): Promise<{
  success: boolean;
  data?: number;
  error?: ErrorResponse;
}> {
  try {
    const response = await fetch(`${API_URL}/cities/count-cities`);
    if (!response.ok) {
      throw new Error("Failed to fetch total number of cities");
    }
    const totalCities = await response.json();
    return { success: true, data: totalCities.response };
  } catch (error: any) {
    return {
      success: false,
      error: { status: "Error", message: error.message },
    };
  }
}

export async function getTotalArticles(): Promise<{
  success: boolean;
  data?: number;
  error?: ErrorResponse;
}> {
  try {
    const response = await fetch(`${API_URL}/articles/count-articles`);
    if (!response.ok) {
      throw new Error("Failed to fetch total number of articles");
    }
    const totalArticles = await response.json();
    return { success: true, data: totalArticles.response };
  } catch (error: any) {
    return {
      success: false,
      error: { status: "Error", message: error.message },
    };
  }
}
export async function getAllAttorneys(): Promise<{
  success?: boolean;
  data?: Attorney[];
  error?: ErrorResponse;
}> {
  try {
    const response = await fetch(`${API_URL}/attorneys`, {
      next: {
        tags: ["fetchAttorney"],
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch attorneys");
    }
    const data = await response.json();
    return {
      success: true,
      data: data.response as Attorney[],
    };
  } catch (error: any) {
    return {
      success: false,
      error: { status: "Error", message: error.message },
    };
  }
}

export async function getAllArticles(): Promise<{
  success?: boolean;
  data?: Article[];
  error?: ErrorResponse;
}> {
  try {
    const response = await fetch(`${API_URL}/articles`, {
      next: {
        tags: ["fetchArticle"],
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch articles");
    }
    const data = await response.json();
    return {
      success: true,
      data: data.response as Article[],
    };
  } catch (error: any) {
    return {
      success: false,
      error: { status: "Error", message: error.message },
    };
  }
}
export async function getAttorneyById(attorneyId: string): Promise<{
  success?: boolean;
  data?: Attorney;
  error?: ErrorResponse;
}> {
  try {
    const response = await fetch(`${API_URL}/attorneys/${attorneyId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch attorney");
    }
    const result = await response.json();
    return { success: true, data: result.response as Attorney };
  } catch (error: any) {
    return {
      success: false,
      error: { status: "Error", message: error.message } as ErrorResponse,
    };
  }
}

export async function getArticleById(articleId: string): Promise<{
  success?: boolean;
  data?: Article;
  error?: ErrorResponse;
}> {
  try {
    const response = await fetch(`${API_URL}/articles/${articleId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch article");
    }
    const result = await response.json();
    return { success: true, data: result.response as Article };
  } catch (error: any) {
    return {
      success: false,
      error: { status: "Error", message: error.message } as ErrorResponse,
    };
  }
}
