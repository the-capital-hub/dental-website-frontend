const API_URL =
  "https://dental-website-backend.onrender.com/api/leads";


// =====================================================
// CREATE LEAD
// =====================================================

export const createLead = async (leadData) => {
  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(leadData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to create lead"
    );
  }

  return result;
};


// =====================================================
// GET ALL LEADS
// =====================================================

export const getLeads = async () => {
  const response = await fetch(API_URL);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message ||
        "Failed to fetch leads"
    );
  }

  return result;
};