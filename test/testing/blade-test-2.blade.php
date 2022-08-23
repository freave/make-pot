<p>
    {{ _n('single 1', 'plural 1', 1, 'domain') }}
</p>
<p>
    {{ _nx('single 2', 'plural 2', 1, 'context', 'domain') }}
</p>
<p>
    @php _n_noop('singular 3', 'plural 3', 'domain') @endphp
</p>
<p>
    @php _nx_noop('singular 4', 'plural 4', 'context', 'domain') @endphp
</p>
<p>
    {{ _n('single split 1',
    'plural 1', 1, 'domain') }}
</p>
<p>
    {{ _nx('single split 2',
    'plural 2', 1, 'context', 'domain') }}
</p>
<p>
    @php _nx_noop('singular split 4',
    'plural 4', 'context', 'domain') @endphp
</p>
