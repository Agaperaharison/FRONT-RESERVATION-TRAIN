<template>
    <div>
        <h1>Discussion</h1>
        <div class="chat-container">
            <div class="messages">
                <div class="message">
                    <p class="received">Hello there!</p>
                </div>
                <div class="message">
                    <p class="sent">Hi! How can I help you?</p>
                </div>
                <div class="message">
                    <p class=" sent">Hi! How can I help you?</p>
                </div>
                <div class="message">
                    <p class="received">Hello there!</p>
                </div>
                <div class="message">
                    <p class="sent">Hi! How can I help you?</p>
                </div>
                <div class="message">
                    <p class="received">Hello there!</p>
                </div>
                <div class="message">
                    <p class="sent">Hi! How can I help you?</p>
                </div>
                <div class="message">
                    <p class="sent">Hi! How can I help you?</p>
                </div>
            </div>
            <div class="write-message">
                <textarea name="" id=""></textarea>
                <button>
                    <span>send</span>
                    <i class="ri-send-plane-line"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-container {
    position: relative;
    margin-top: 1rem;
    width: 400px;
    border: 1px solid var(--color-info-dark);
    border-radius: 10px;
    overflow: auto;
    min-height: 90%;
}

.chat-container .messages {
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    height: auto;
    max-height: 80%;
    overflow-y: auto;
    bottom: 6.5rem;
}

.message {
    position: relative;
    max-width: 100%;
    transition: all .1s ease;
}

.message p {
    max-width: 70%;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
}

.received {
    background-color: var(--color-success);
    color: white;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.sent {
    background-color: var(--color-light);
    border: 1px solid var(--color-info-light);
    color: var(--color-dark);
    float: right;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.write-message {
    position: absolute;
    display: grid;
    gap: 1rem;
    grid-template-columns: auto 7rem;

    bottom: 10px;
    width: 100%;
    padding: 0 1rem;
    height: 70px;
}

textarea {
    border: 2px solid var(--color-info-dark);
    background: var(--color-white);
    color: var(--color-dark);
    padding: 10px;
    font-size: 1rem;
    font-weight: 600;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
}

button {
    display: flex;
    gap: .5rem;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 7px;
    background: var(--color-primary);
    height: 50%;
}

span {
    font-size: 1.3rem;
    font-weight: 600;
    color: #fff;
}

i {
    font-size: 1.5rem;
    color: #fff;
}
</style>