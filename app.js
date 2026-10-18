document.addEventListener('DOMContentLoaded', () => {
    const aiInput = document.getElementById('aiInput');
    const humanOutput = document.getElementById('humanOutput');
    const toneSelect = document.getElementById('toneSelect');
    const resetBtn = document.getElementById('resetBtn');
    const sampleBtn = document.getElementById('sampleBtn');
    const humanizeBtn = document.getElementById('humanizeBtn');
    const shareBtn = document.getElementById('shareBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const copyBtn = document.getElementById('copyBtn');
    const copyFeedback = document.getElementById('copyFeedback');
    const inputWordCount = document.getElementById('inputWordCount');
    const outputWordCount = document.getElementById('outputWordCount');

    const sampleText = "Our current paradigm necessitates the utilization of robust optimization protocols to facilitate maximized operational efficiencies in Q4. Furthermore, synergistic alignment must be established across all relevant cross-functional teams to ensure optimal outcomes.";

    const dictionary = {
        casual: [
            { regex: /\butilization\b/gi, sub: 'use' },
            { regex: /\butilize\b/gi, sub: 'use' },
            { regex: /\bfacilitate\b/gi, sub: 'help' },
            { regex: /\bnecessitates\b/gi, sub: 'calls for' },
            { regex: /\brobust\b/gi, sub: 'strong' },
            { regex: /\boptimization protocols\b/gi, sub: 'improvements' },
            { regex: /\boperational efficiencies\b/gi, sub: 'results' },
            { regex: /\bFurthermore,\b/gi, sub: 'Also,' },
            { regex: /\bsynergistic alignment\b/gi, sub: 'teamwork' },
            { regex: /\bcross-functional teams\b/gi, sub: 'groups' },
            { regex: /\boptimal outcomes\b/gi, sub: 'great results' }
        ],
        professional: [
            { regex: /\butilization\b/gi, sub: 'use' },
            { regex: /\butilize\b/gi, sub: 'use' },
            { regex: /\bfacilitate\b/gi, sub: 'support' },
            { regex: /\bnecessitates\b/gi, sub: 'requires' },
            { regex: /\brobust\b/gi, sub: 'reliable' },
            { regex: /\boptimization protocols\b/gi, sub: 'optimized workflows' },
            { regex: /\boperational efficiencies\b/gi, sub: 'productivity' },
            { regex: /\bFurthermore,\b/gi, sub: 'In addition,' },
            { regex: /\bsynergistic alignment\b/gi, sub: 'close collaboration' },
            { regex: /\bcross-functional teams\b/gi, sub: 'teams' },
            { regex: /\boptimal outcomes\b/gi, sub: 'strong results' }
        ],
        blog: [
            { regex: /\butilization\b/gi, sub: 'making use' },
            { regex: /\butilize\b/gi, sub: 'use' },
            { regex: /\bfacilitate\b/gi, sub: 'make easier' },
            { regex: /\bnecessitates\b/gi, sub: 'means we need' },
            { regex: /\brobust\b/gi, sub: 'solid' },
            { regex: /\boptimization protocols\b/gi, sub: 'smart strategies' },
            { regex: /\boperational efficiencies\b/gi, sub: 'getting things done' },
            { regex: /\bFurthermore,\b/gi, sub: 'On top of that,' },
            { regex: /\bsynergistic alignment\b/gi, sub: 'getting everyone on the same page' },
            { regex: /\bcross-functional teams\b/gi, sub: 'all teams' },
            { regex: /\boptimal outcomes\b/gi, sub: 'the best output' }
        ],
        academic: [
            { regex: /\butilization\b/gi, sub: 'application' },
            { regex: /\butilize\b/gi, sub: 'employ' },
            { regex: /\bfacilitate\b/gi, sub: 'enable' },
            { regex: /\bnecessitates\b/gi, sub: 'demands' },
            { regex: /\brobust\b/gi, sub: 'comprehensive' },
            { regex: /\boptimization protocols\b/gi, sub: 'methodological frameworks' },
            { regex: /\boperational efficiencies\b/gi, sub: 'performance metrics' },
            { regex: /\bFurthermore,\b/gi, sub: 'Moreover,' },
            { regex: /\bsynergistic alignment\b/gi, sub: 'interdisciplinary cohesion' },
            { regex: /\bcross-functional teams\b/gi, sub: 'related departments' },
            { regex: /\boptimal outcomes\b/gi, sub: 'maximized efficacy' }
        ]
    };

    function calculateStats(text) {
        const trimmed = text.trim();
        const chars = text.length;
        const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length;
        return { words, chars };
    }

    function updateCounters() {
        const inStats = calculateStats(aiInput.value);
        inputWordCount.textContent = `${inStats.words} WORDS | ${inStats.chars} CHARS`;

        const outStats = calculateStats(humanOutput.value);
        outputWordCount.textContent = `${outStats.words} WORDS | ${outStats.chars} CHARS`;
    }

    aiInput.addEventListener('input', updateCounters);

    sampleBtn.addEventListener('click', () => {
        aiInput.value = sampleText;
        updateCounters();
    });

    resetBtn.addEventListener('click', () => {
        aiInput.value = '';
        humanOutput.value = '';
        updateCounters();
    });

    humanizeBtn.addEventListener('click', () => {
        let text = aiInput.value;
        if (!text.trim()) return;

        const selectedTone = toneSelect.value;
        const rules = dictionary[selectedTone] || dictionary.professional;

        rules.forEach(rule => {
            text = text.replace(rule.regex, rule.sub);
        });

        text = text.replace(/\s{2,}/g, ' ').trim();
        humanOutput.value = text;
        updateCounters();
    });

    copyBtn.addEventListener('click', () => {
        if (!humanOutput.value) return;
        navigator.clipboard.writeText(humanOutput.value).then(() => {
            copyFeedback.classList.add('active');
            setTimeout(() => copyFeedback.classList.remove('active'), 2000);
        });
    });

    downloadBtn.addEventListener('click', () => {
        if (!humanOutput.value) return;
        const blob = new Blob([humanOutput.value], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'de-bot-humanized.txt';
        a.click();
        URL.revokeObjectURL(url);
    });

    shareBtn.addEventListener('click', () => {
        if (navigator.share && humanOutput.value) {
            navigator.share({
                title: 'DE-BOT Humanized Text',
                text: humanOutput.value
            }).catch(() => {});
        } else if (humanOutput.value) {
            navigator.clipboard.writeText(humanOutput.value);
            alert('Text copied to clipboard for sharing!');
        }
    });

    updateCounters();
});