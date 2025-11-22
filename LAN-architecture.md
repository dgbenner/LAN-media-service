LAN Architecture

This is a Local Area Network (LAN) setup - all communication stays within your home network.

Your Computer (192.168.1.x)
        ↓
   Home Router (LAN)
        ↓
   Apple TV (192.168.1.y)

LAN Characteristics:
- Local IP addresses (192.168.x.x or 10.0.x.x)
- Fast speeds (no internet bottleneck)
- Private - only devices on your WiFi can access
- Works even when internet is down
- DLNA uses multicast to discover devices

LAN vs WAN:
- LAN (this project): Computer → Router → Apple TV (all local)
- WAN (like Netflix): Computer → Internet → Servers → Internet → Apple TV

Media never leaves your local network.
