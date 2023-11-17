'use client'

import 'highlight.js/styles/sunburst.css';
import hljs from 'highlight.js';

import * as math from '@/lib/math';

import { useEffect } from "react";

export default function Client() {

    useEffect(() => {
        hljs.highlightAll();
        math.renderMath();
    });

    return (
        <></>
    );
}