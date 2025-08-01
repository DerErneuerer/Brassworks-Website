"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { User, Pencil } from "lucide-react";
import { updateUserProfile } from "@/lib/services/accountService";

interface ProfileCardProps {
  email: string;
  username: string;
  name: string;
  address: string;
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setName: (name: string) => void;
  setAddress: (address: string) => void;
}

function InputWithIcon({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <div className="relative">
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          disabled
          className="bg-neutral-700 text-white border-neutral-600 pr-10 disabled:opacity-100 disabled:cursor-default"
        />
        <Pencil className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-200 cursor-pointer" />
      </div>
    </div>
  );
}

export default function ProfileCard({
  email,
  username,
  name,
  address,
  setEmail,
  setUsername,
  setName,
  setAddress,
}: ProfileCardProps) {
  return (
    <Card className="bg-neutral-800 text-white">
      <CardContent className="p-5 flex flex-col gap-4">
        <h2 className="text-lg leading-none font-semibold flex items-center gap-2">
          <User className="w-5 h-5" /> Profile
        </h2>

        <InputWithIcon
          label="Username"
          value={username}
          onChange={(e) => {
            const val = e.target.value;
            setUsername(val);
            updateUserProfile({ username: val });
          }}
        />
        <InputWithIcon
          label="Email"
          type="email"
          value={email}
          onChange={(e) => {
            const val = e.target.value;
            setEmail(val);
            updateUserProfile({ email: val });
          }}
        />
        <InputWithIcon
          label="Full Name"
          value={name}
          placeholder="Add full name"
          onChange={(e) => {
            const val = e.target.value;
            setName(val);
            updateUserProfile({ name: val });
          }}
        />
        <InputWithIcon
          label="Address"
          value={address}
          placeholder="Add address"
          onChange={(e) => {
            const val = e.target.value;
            setAddress(val);
            updateUserProfile({ address: val });
          }}
        />
      </CardContent>
    </Card>
  );
}