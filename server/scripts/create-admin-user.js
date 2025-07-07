const { db } = require('../config/firebase');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function createAdminUser() {
  console.log('👤 Admin User Setup');
  console.log('==================\n');
  
  // List existing users
  const usersSnapshot = await db.collection('users').get();
  
  if (usersSnapshot.size === 0) {
    console.log('❌ No users found. Please register a user first through the frontend.');
    process.exit(1);
  }
  
  console.log('📋 Existing users:');
  usersSnapshot.forEach((doc, index) => {
    const user = doc.data();
    console.log(`${index + 1}. ${user.displayName} (${user.email}) - Admin: ${user.isAdmin || false}`);
  });
  
  rl.question('\nEnter the number of the user to make admin (or 0 to cancel): ', async (answer) => {
    const userIndex = parseInt(answer) - 1;
    
    if (userIndex === -1) {
      console.log('❌ Cancelled');
      rl.close();
      return;
    }
    
    if (userIndex < 0 || userIndex >= usersSnapshot.size) {
      console.log('❌ Invalid selection');
      rl.close();
      return;
    }
    
    const userDoc = usersSnapshot.docs[userIndex];
    const userData = userDoc.data();
    
    try {
      await db.collection('users').doc(userDoc.id).update({
        isAdmin: true,
        updatedAt: new Date()
      });
      
      console.log(`✅ ${userData.displayName} is now an admin user!`);
      console.log(`🔐 They can now access the admin panel at /admin`);
      
    } catch (error) {
      console.error('❌ Error updating user:', error);
    }
    
    rl.close();
  });
}

createAdminUser().catch(console.error); 