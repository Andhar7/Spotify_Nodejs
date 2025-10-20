import { useEffect, useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import UsersListSkeleton from "@/components/skeletons/UsersListSkeleton";

const ChatPage = () => {
  const { user } = useAuthStore();
  const {
    users,
    selectedUser,
    messages,
    isLoading,
    fetchUsers,
    fetchMessages,
    sendMessage,
    setSelectedUser,
    onlineUsers,
  } = useChatStore();

  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser.id.toString());
    }
  }, [selectedUser, fetchMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedUser || !user) return;

    sendMessage(selectedUser.id.toString(), user.id.toString(), messageInput);
    setMessageInput("");
  };

  return (
    <div className='h-full flex bg-zinc-900'>
      {/* Users List */}
      <div className='w-80 border-r border-zinc-800 flex flex-col'>
        <div className='p-4 border-b border-zinc-800'>
          <h2 className='text-xl font-bold text-white'>Messages</h2>
        </div>

        <ScrollArea className='flex-1'>
          {isLoading ? (
            <UsersListSkeleton />
          ) : (
            <div className='p-4 space-y-2'>
              {users.map((u) => {
                const isOnline = onlineUsers.has(u.id.toString());
                const isSelected = selectedUser?.id === u.id;

                return (
                  <div
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    className={`
                      flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                      ${isSelected ? "bg-zinc-800" : "hover:bg-zinc-800/50"}
                    `}
                  >
                    <div className='relative'>
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name}`} />
                        <AvatarFallback>{u.name[0]}</AvatarFallback>
                      </Avatar>
                      {isOnline && (
                        <div className='absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-zinc-900' />
                      )}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='font-medium text-white truncate'>{u.name}</p>
                      <p className='text-sm text-zinc-400 truncate'>{isOnline ? "Online" : "Offline"}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className='flex-1 flex flex-col'>
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className='p-4 border-b border-zinc-800 flex items-center gap-3'>
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.name}`} />
                <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className='font-medium text-white'>{selectedUser.name}</h3>
                <p className='text-sm text-zinc-400'>
                  {onlineUsers.has(selectedUser.id.toString()) ? "Online" : "Offline"}
                </p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className='flex-1 p-4'>
              <div className='space-y-4'>
                {messages.map((message) => {
                  const isSentByMe = message.senderId.toString() === user?.id.toString();

                  return (
                    <div key={message.id} className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`
                          max-w-[70%] rounded-lg p-3
                          ${isSentByMe ? "bg-emerald-500 text-black" : "bg-zinc-800 text-white"}
                        `}
                      >
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 ${isSentByMe ? "text-black/70" : "text-zinc-400"}`}>
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className='p-4 border-t border-zinc-800'>
              <div className='flex gap-2'>
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder='Type a message...'
                  className='flex-1'
                />
                <Button type='submit' size='icon' disabled={!messageInput.trim()}>
                  <Send className='h-5 w-5' />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className='flex-1 flex items-center justify-center text-zinc-400'>
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
