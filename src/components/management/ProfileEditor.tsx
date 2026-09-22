'use client'

import React, { useState } from 'react'
import {
  User,
  Phone,
  Camera,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Save,
} from 'lucide-react'
import { updateOwnProfile, uploadOwnAvatar, removeOwnAvatar } from '@/lib/actions/profile'
import type { Profile } from '@/types'

interface ProfileEditorProps {
  profile: Profile
}

export function ProfileEditor({ profile }: ProfileEditorProps) {
  const [fullName, setFullName] = useState(profile.full_name || '')
  const [phone, setPhone] = useState(profile.phone || '')
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar_url || '')
  const [loading, setLoading] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const formData = new FormData()
    formData.set('fullName', fullName)
    formData.set('phone', phone)

    const res = await updateOwnProfile(formData)
    setLoading(false)

    if (res.success) {
      setMessage({ type: 'success', text: 'Personal profile details updated successfully!' })
      setTimeout(() => setMessage(null), 4000)
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to update profile' })
    }
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingAvatar(true)
    setMessage(null)

    const formData = new FormData()
    formData.set('avatar', file)

    const res = await uploadOwnAvatar(formData)
    setUploadingAvatar(false)

    if (res.success && res.avatarUrl) {
      setAvatarUrl(res.avatarUrl)
      setMessage({ type: 'success', text: 'Profile photo uploaded and updated!' })
      setTimeout(() => setMessage(null), 4000)
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to upload photo' })
    }
  }

  const handleAvatarRemove = async () => {
    if (!confirm('Remove your profile photo?')) return

    setUploadingAvatar(true)
    const res = await removeOwnAvatar()
    setUploadingAvatar(false)

    if (res.success) {
      setAvatarUrl('')
      setMessage({ type: 'success', text: 'Profile photo removed.' })
      setTimeout(() => setMessage(null), 4000)
    } else {
      setMessage({ type: 'error', text: res.error || 'Failed to remove photo' })
    }
  }

  return (
    <div className="p-6 rounded-2xl bg-[#161614] border border-[#2A2A26] space-y-6">
      <div>
        <h3 className="text-base font-bold font-serif text-[#F1EBDD]">
          Edit Personal Details
        </h3>
        <p className="text-xs text-[#F1EBDD]/60 font-sans mt-0.5">
          Update your display name, contact phone, and company profile picture.
        </p>
      </div>

      {message && (
        <div
          className={`p-3.5 rounded-xl border flex items-center gap-2.5 text-xs font-mono ${
            message.type === 'success'
              ? 'bg-[#68704A]/20 text-[#D4E0A5] border-[#68704A]/40'
              : 'bg-[#641F2A]/20 text-[#FFA5B3] border-[#641F2A]/40'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Avatar Management Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#1B1B18] border border-[#2A2A26]">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#11110F] border border-[#2A2A26] flex items-center justify-center overflow-hidden shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile photo"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="font-serif font-bold text-xl text-[#F1EBDD]">
                {(fullName || 'U').charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <div className="text-xs font-semibold text-[#F1EBDD]">
              Profile Photo
            </div>
            <div className="text-[11px] text-[#F1EBDD]/50 font-mono">
              JPEG, PNG or WebP under 2MB
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="px-3.5 py-2 rounded-xl bg-[#641F2A] hover:bg-[#641F2A]/90 text-[#F1EBDD] text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5 shadow-sm">
            <Camera className="w-3.5 h-3.5" />
            <span>{uploadingAvatar ? 'Uploading...' : 'Upload Photo'}</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleAvatarUpload}
              disabled={uploadingAvatar}
              className="hidden"
            />
          </label>

          {avatarUrl && (
            <button
              type="button"
              onClick={handleAvatarRemove}
              disabled={uploadingAvatar}
              className="p-2 rounded-xl bg-white/[0.04] hover:bg-[#641F2A]/20 hover:text-red-300 text-[#F1EBDD]/60 border border-[#2A2A26] transition-colors"
              title="Remove profile photo"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono uppercase text-[#F1EBDD]/60 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Your full name"
              className="w-full px-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-sm text-[#F1EBDD] placeholder-[#F1EBDD]/30 focus:outline-none focus:border-[#641F2A] transition-colors font-sans"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-[#F1EBDD]/60 mb-1.5">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2.5 rounded-xl bg-[#1B1B18] border border-[#2A2A26] text-sm text-[#F1EBDD] placeholder-[#F1EBDD]/30 focus:outline-none focus:border-[#641F2A] transition-colors font-sans"
            />
          </div>
        </div>

        {/* Read-only Governance Notice */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-[#2A2A26] text-[11px] text-[#F1EBDD]/50 font-mono">
          Note: System Role, Department, and Position assignments are governed by the Tech Lead and Operations Administration. Contact leadership to request organizational changes.
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-[#641F2A] hover:bg-[#641F2A]/90 text-[#F1EBDD] text-xs font-semibold font-sans flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{loading ? 'Saving...' : 'Save Profile Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}
