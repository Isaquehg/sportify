//
//  SafeAreaIntentsKey.swift
//  sportify
//
//  Created by Isaque Hollanda Goncalves on 25/07/24.
//

import SwiftUI

struct SafeAreaInsetsKey: EnvironmentKey {
    static let defaultValue: EdgeInsets = EdgeInsets()
}

extension EnvironmentValues {
    var safeAreaInsets: EdgeInsets {
        get { self[SafeAreaInsetsKey.self] }
        set { self[SafeAreaInsetsKey.self] = newValue }
    }
}

struct SafeAreaInsetsView<Content: View>: View {
    let content: Content
    
    init(@ViewBuilder content: () -> Content) {
        self.content = content()
    }
    
    var body: some View {
        GeometryReader { geometry in
            content
                .environment(\.safeAreaInsets, geometry.safeAreaInsets)
        }
    }
}
