import { initDB, STORE_NAME } from "./config";

export const registerUser = async (name) => {
    const db = await initDB();
    const existingUser = await db.get(STORE_NAME, name);

    if (!existingUser) {
        await db.add(STORE_NAME, { name, highScore: 0, attempts: [] });
        // console.log(`User ${name} registered successfully.`);
    } else {
        console.log(`User ${name} already exists.`);
    }
};

export const updateScore = async (name, newScore) => {
    const db = await initDB();
    const user = await db.get(STORE_NAME, name);

    if (user) {
        const updatedHighScore = Math.max(user.highScore, newScore);
        const updatedAttempts = [...user.attempts, newScore];

        await db.put(STORE_NAME, {
            name,
            highScore: updatedHighScore,
            attempts: updatedAttempts,
        });

        // console.log(`Score updated for ${name}: High Score - ${updatedHighScore}, Attempts - ${updatedAttempts.length}`);
    } else {
        console.log("User not found!");
    }
};

export const getUserData = async (name) => {
    const db = await initDB();
    return await db.get(STORE_NAME, name);
};

export const clearUserData = async (name) => {
    const db = await initDB();
    await db.delete(STORE_NAME, name);
    console.log(`User ${name} data cleared.`);
};
