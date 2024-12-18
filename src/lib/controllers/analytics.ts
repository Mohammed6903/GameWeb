'use server'
import { google } from 'googleapis';

export async function getNewUsersCount(): Promise<number | null> {
  try {
    // Load and decode the service account key from environment variables
    const encodedKey = process.env.SERVICE_ACCOUNT_KEY;
    if (!encodedKey) {
      throw new Error('Service account key not found in environment variables.');
    }

    const decodedKey = Buffer.from(encodedKey, 'base64').toString('utf-8');
    const credentials = JSON.parse(decodedKey);

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    // Create the Analytics Data API client
    const analytics = google.analyticsdata({
      version: 'v1beta',
      auth,
    });

    // Replace with your Google Analytics property ID
    const propertyId = process.env.PROPERTY_ID;

    // Query for new users
    const response = await analytics.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [
          {
            startDate: '7daysAgo',
            endDate: 'today',
          },
        ],
        dimensions: [{ name: 'newVsReturning' }],
        metrics: [{ name: 'activeUsers' }],
      },
    });

    // Check if rows exist in the response
    const rows = response.data.rows;
    if (!rows) {
      console.error('No rows returned in the response');
      return null;
    }

    // Extract new users count
    const newUsersData = rows.find(
      (row) =>
        row.dimensionValues &&
        row.dimensionValues[0]?.value === 'new'
    );

    if (!newUsersData || !newUsersData.metricValues) {
      console.error('No data found for new users');
      return null;
    }

    // Parse the new users count safely
    const newUsersCount = parseInt(newUsersData.metricValues[0]?.value || '0', 10);
    return newUsersCount;
  } catch (error) {
    console.error('Error fetching new users:', error);
    return null; // Return null in case of error
  }
}