import SwiftUI

enum BottomBarSelectedTab: Int {
    case home = 0
    case search = 1
    case plus = 2
    case notification = 3
    case profile = 4
}

struct BottomBar: View {
    @Environment(\.safeAreaInsets) var safeAreaInsets
    @Environment(\.colorScheme) var colorScheme
    @Binding var selectedTab: BottomBarSelectedTab
    
    var body: some View {
        HStack(spacing: 10) {
            // Home
            Button {
                selectedTab = .home
            } label: {
                ZStack {
                    BottomBarButtonView(image: "house.fill", text: "Home", isActive: selectedTab == .home)
                }
            }
            
            // Search
            Button {
                selectedTab = .search
            } label: {
                BottomBarButtonView(image: "message.badge", text: "Chat", isActive: selectedTab == .search)
            }
            
            // Plus
            Button {
                selectedTab = .plus
            } label: {
                VStack {
                    ZStack {
                        VStack(spacing: 3) {
                            RoundedRectangle(cornerRadius: 30)
                                .frame(width: 60, height: 60)
                                .foregroundColor(.green)
                        }
                        VStack(spacing: 3) {
                            Image(systemName: "plus")
                                .font(.title)
                                .foregroundColor(.white)
                        }
                    }
                    .padding(EdgeInsets(top: -23, leading: 0, bottom: 0, trailing: 0))
                    Spacer()
                }
            }
            
            // Notification
            Button {
                selectedTab = .notification
            } label: {
                BottomBarButtonView(image: "heart", text: "Saved", isActive: selectedTab == .notification)
            }
            
            // Profile
            Button {
                selectedTab = .profile
            } label: {
                BottomBarButtonView(image: "person", text: "Profile", isActive: selectedTab == .profile)
            }
        }
        .frame(height: 40 + safeAreaInsets.bottom) // Include safe area inset
        .background(
            Image("bottomBarBG")
                .renderingMode(.template)
                .foregroundColor(Color("PrimaryWhite"))
        )
        .shadow(color: Color("PrimaryBlack").opacity(colorScheme == .dark ? 0.5 : 0.1), radius: 10, x: 0, y: 0)
        .padding(.bottom, safeAreaInsets.bottom) // Include safe area inset
    }
}

struct BottomBar_Previews: PreviewProvider {
    static var previews: some View {
        SafeAreaInsetsView {
            BottomBar(selectedTab: .constant(.plus))
        }
    }
}

struct BottomBarButtonView: View {
    var image: String
    var text: String
    var isActive: Bool
    
    var body: some View {
        HStack(spacing: 10) {
            GeometryReader { geo in
                VStack(spacing: 3) {
                    Rectangle()
                        .frame(height: 0)
                    Image(systemName: image)
                        .resizable()
                        .frame(width: 24, height: 24)
                        .foregroundColor(isActive ? .green : .gray)
                    Text(text)
                        .font(.caption)
                        .foregroundColor(isActive ? .green : .gray)
                }
            }
        }
    }
}
