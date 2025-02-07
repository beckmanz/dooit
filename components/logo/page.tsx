import React from 'react'
import { View } from 'react-native'
import Svg, { Path, Rect } from 'react-native-svg'

interface Props {
    heigth: number
    width: number
    fillColor: string
    strokeColor: string
}

export function Logo({ heigth, width, fillColor, strokeColor }: Props) {
    return (
        <View style={{ marginLeft: 5 }}>
            <Svg width={width} height={heigth} viewBox="0 0 72 56" fill="none">
                <Rect x="0.887" y="1.887" width="55" height="53.226" rx="8.575" fill={fillColor} stroke={strokeColor} strokeWidth="1.774" />
                <Path d="M28 14.4248L40.1622 28.3245L67.9616 4" stroke={strokeColor} strokeWidth="6.94984" strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
        </View>
    )
}
