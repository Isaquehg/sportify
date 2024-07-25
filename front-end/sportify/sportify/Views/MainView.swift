import SwiftUI

struct MainView: View {
    @State private var selectedTab: BottomBarSelectedTab = .home
    
    var body: some View {
        ZStack {
            Color.white.ignoresSafeArea()
            
            VStack {
                VStack(spacing: 0) {
                    // Search bar and filters
                    HStack {
                        TextField("Search", text: .constant(""))
                            .padding()
                            .foregroundColor(.green)
                            .background(Color(.systemGray5))
                            .cornerRadius(10)
                        Spacer()
                        VStack() {
                            Image(systemName: "line.3.horizontal.decrease.circle.fill")
                                .resizable(capInsets: EdgeInsets(top: 13.0, leading: 13.0, bottom: 13.0, trailing: 13.0))
                                .frame(width: 25.0, height: 25.0)
                                .foregroundColor(.green)
                                .multilineTextAlignment(.center)
                            Text("Filter")
                                .font(/*@START_MENU_TOKEN@*/.caption2/*@END_MENU_TOKEN@*/)
                                .multilineTextAlignment(.center)
                        }
                    }
                    .padding()
                    
                    // Sport selection
                    HStack(spacing: 16) {
                        ForEach(["Baseb.", "Basket", "Soccer", "Tennis", "Golf", "Rockey"], id: \.self) {
                                sport in
                                    VStack {
                                        Image(systemName: "sportscourt") // Replace with sport icon
                                        Text(sport)
                                            .font(.caption)
                                    }
                        }
                        Spacer()
                        Image(systemName: "arrow.forward") // More options
                    }
                    .padding(.horizontal)
                    .padding(.bottom, 8)
                    
                    Divider()
                    
                    // List of events
                    List {
                        ForEach(0..<10) { _ in
                            EventRowView()
                        }
                    }
                    .listStyle(PlainListStyle())
                }
                Spacer()
                
                // Bottom Menu
                BottomBar(selectedTab: $selectedTab)
                    .background(Color.white)
            }
        }
    }
    
    @ViewBuilder
    private func content(for tab: BottomBarSelectedTab) -> some View {
        switch tab {
        case .home:
            Text("Home View")
        case .search:
            Text("Search View")
        case .plus:
            Text("Plus View")
        case .notification:
            Text("Notification View")
        case .profile:
            Text("Profile View")
        }
    }
}

struct MainView_Previews: PreviewProvider {
    static var previews: some View {
        MainView()
    }
}
