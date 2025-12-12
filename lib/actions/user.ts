'use server'

import { auth, currentUser } from '@clerk/nextjs/server'

export async function getUserDetails() {
  try {
    // Get the auth object with userId
    const { userId } = await auth()
    
    if (!userId) {
      return { error: 'Not authenticated', user: null }
    }

    // Get the full user object with all details
    const user = await currentUser()
    
    if (!user) {
      return { error: 'User not found', user: null }
    }

    // Return formatted user data
    return {
      success: true,
      user: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        username: user.username,
        imageUrl: user.imageUrl,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        // Add any other fields you need
      }
    }
  } catch (error) {
    console.error('Error fetching user details:', error)
    return { error: 'Failed to fetch user details', user: null }
  }
}

// Alternative: Get just the userId (lighter weight)
export async function getUserId() {
  try {
    const { userId } = await auth()
    return { userId }
  } catch (error) {
    console.error('Error fetching user ID:', error)
    return { userId: null }
  }
}