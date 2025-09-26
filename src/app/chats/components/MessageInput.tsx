import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface Props {
  sendMessage: () => Promise<void>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

function MessageInput({ sendMessage, message, setMessage }: Props) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <div className="relative flex items-center p-4 border-t border-gray-200">
      {/* Emoji Picker Button */}
      <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        type="text"
        placeholder="Type a message..."
        className="flex-1 border-none p-2 outline-none"
      />

      <FaPaperPlane
        onClick={() => sendMessage()}
        className="text-blue-500 cursor-pointer ml-2"
      />

      {showEmojiPicker && (
        <div className="absolute right-0 bottom-full p-2 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}

export default MessageInput;
