<template>
  <div>
    <div class="main">
      <input type="checkbox" id="chk">

      <div class="signup">
        <form action="/">

          <label for="chk">Sign up</label>
          <input type="text" name="txt" placeholder="User name" required="">

          <input type="email" name="email" id="" placeholder="email" required="">
          <input type="password" name="pswd" placeholder="password" id="" required="">
          <input type="password" name="pswd" placeholder="chk password" id="" required="">
          <button>Sign up</button>
        </form>
      </div>

      <div class="login">
        <form action="/">
          <label for="chk">Login</label>
          <input type="email" name="email" id="" placeholder="Email Or User name" required="">
          <input type="password" name="password" id="" placeholder="password" required="">
          <button>Login</button>
          <button type="reset">Reset</button>
          <p>Don't have account <a href="#">Create account</a>.</p>
        </form>
      </div>
    </div>
  </div>

</template>
<style>
body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: sans-serif;
}

.main {
    width: 350px;
    height: 480px;
    background: rgb(111, 128, 224);
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 5px 30px 50px black;
}

#chk {
    display: none;
}

.signup {
    position: relative;
    width: 100%;
    height: 100%;
}

label {
    color: white;
    font-size: 35px;
    justify-content: center;
    display: flex;
    margin: 60px;
    font-weight: bold;
    cursor: pointer;
    transition: .5s ease-in-out;
    margin-bottom: 10px;
}

input {
    width: 60%;
    height: 20px;
    background: white;
    justify-content: center;
    display: flex;
    margin: 18px auto;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 50px;
}

button {
    width: 60%;
    height: 40px;
    margin: 10px auto;
    justify-content: center;
    display: block;
    color: white;
    background: rgb(43, 83, 194);
    font-size: 20px;
    font-weight: bold;
    margin-top: 18px;
    outline: none;
    border: none;
    border-radius: 10px;
    transition: .3s ease-in;
    cursor: pointer;
    box-shadow: 5px 20px 40px black;
}

button:hover {
    background: rgb(20, 57, 105);
}

#chk:checked ~ .signup label {
    transform: scale(.3);
}
</style>

<script>
export default {};

</script>