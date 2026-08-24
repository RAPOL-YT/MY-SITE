import { createClient } from
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

import {
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
} from "./config.js";


const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);


// ================================
// REGISTER
// ================================

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("registerMessage");


        if (password !== confirmPassword) {

            message.textContent =
                "كلمتا المرور غير متطابقتين.";

            return;
        }


        message.textContent =
            "جاري إنشاء الحساب...";


        const { data, error } =
            await supabase.auth.signUp({

                email: email,

                password: password,

                options: {

                    data: {
                        name: name
                    }

                }

            });


        if (error) {

            console.error(error);

            message.textContent =
                "حدث خطأ: " + error.message;

            return;
        }


        message.textContent =
            "تم إنشاء الحساب بنجاح!";


        setTimeout(() => {

            window.location.href =
                "profile.html";

        }, 1000);

    });

}



// ================================
// LOGIN
// ================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const message =
            document.getElementById("loginMessage");


        message.textContent =
            "جاري تسجيل الدخول...";


        const { data, error } =
            await supabase.auth.signInWithPassword({

                email: email,

                password: password

            });


        if (error) {

            console.error(error);

            message.textContent =
                "البريد الإلكتروني أو كلمة المرور غير صحيحة.";

            return;
        }


        message.textContent =
            "تم تسجيل الدخول!";


        window.location.href =
            "profile.html";

    });

}



// ================================
// PROFILE
// ================================

const userName =
    document.getElementById("userName");

const userEmail =
    document.getElementById("userEmail");

const profileName =
    document.getElementById("profileName");

const avatarLetter =
    document.getElementById("avatarLetter");


if (
    userName ||
    userEmail ||
    profileName
) {

    const {
        data: { user }
    } = await supabase.auth.getUser();


    if (!user) {

        window.location.href =
            "login.html";

    } else {

        const name =
            user.user_metadata?.name || "GHOST";


        if (userName) {

            userName.textContent =
                name;

        }


        if (profileName) {

            profileName.textContent =
                name;

        }


        if (userEmail) {

            userEmail.textContent =
                user.email;

        }


        if (avatarLetter) {

            avatarLetter.textContent =
                name.charAt(0).toUpperCase();

        }

    }

}



// ================================
// LOGOUT
// ================================

const logoutButton =
    document.getElementById("logoutButton");


if (logoutButton) {

    logoutButton.addEventListener("click", async () => {

        await supabase.auth.signOut();

        window.location.href =
            "index.html";

    });

}